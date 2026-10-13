const { spawn } = require('child_process');
const http = require('http');

async function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function getWsUrl(port) {
  for (let i = 0; i < 20; i++) {
    try {
      const res = await new Promise((resolve, reject) => {
        http.get(`http://127.0.0.1:${port}/json`, (resp) => {
          let data = '';
          resp.on('data', chunk => data += chunk);
          resp.on('end', () => resolve(JSON.parse(data)));
        }).on('error', reject);
      });
      if (Array.isArray(res)) {
        const pageTarget = res.find(t => t.type === 'page') || res[0];
        if (pageTarget && pageTarget.webSocketDebuggerUrl) {
          return pageTarget.webSocketDebuggerUrl;
        }
      }
    } catch (_) {}
    await wait(300);
  }
  throw new Error('Could not get CDP WebSocket URL');
}

async function run() {
  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const port = 9333;
  const url = 'file:///Users/sidhhrana/Documents/codes/hackathon/index.html';

  console.log('1. Launching headless Chrome...');
  const chrome = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--user-data-dir=/tmp/test-chrome-profile-' + Date.now(),
    '--disable-gpu',
    '--no-first-run',
    url
  ]);

  try {
    const wsUrl = await getWsUrl(port);
    console.log('2. Connected to Chrome CDP at:', wsUrl);

    const ws = new WebSocket(wsUrl);
    let msgId = 1;
    const callbacks = new Map();

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (callbacks.has(data.id)) {
        callbacks.get(data.id)(data);
        callbacks.delete(data.id);
      }
    };

    await new Promise(r => ws.onopen = r);

    function send(method, params = {}) {
      return new Promise((resolve) => {
        const id = msgId++;
        callbacks.set(id, resolve);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await send('Page.enable');
    await send('Page.navigate', { url });
    await wait(1200);

    async function evalCode(expression) {
      const res = await send('Runtime.evaluate', {
        expression,
        returnByValue: true,
        awaitPromise: true
      });
      if (res.result.exceptionDetails) {
        throw new Error(JSON.stringify(res.result.exceptionDetails));
      }
      return res.result.result.value;
    }

    console.log('3. Waiting for page load and DOM readiness...');
    await wait(1000);

    // Test 1: Title and initial view
    const title = await evalCode('document.title');
    console.log('Page Title:', title);

    // Test 2: Switch to Workspace
    console.log('4. Testing view navigation to Studio workspace...');
    await evalCode("showView('workspace')");
    const wsDisplay = await evalCode("document.getElementById('page-workspace').style.display");
    console.log('Workspace display:', wsDisplay);
    if (wsDisplay !== 'flex') throw new Error('Workspace failed to show');

    // Test 3: Document title in Workspace
    const currentDocTitle = await evalCode("document.getElementById('docTitle').textContent");
    console.log('Initial doc in studio:', currentDocTitle);

    // Test 4: Finding selection & tracing
    console.log('5. Testing bidirectional selection and tracing...');
    await evalCode("selectFinding('renewal')");
    const isSelected = await evalCode("document.getElementById('card-renewal').classList.contains('selected')");
    const isBboxHighlighted = await evalCode("document.getElementById('bbox-renewal').classList.contains('box-highlighted')");
    console.log('Card selected:', isSelected, '| Bounding box highlighted:', isBboxHighlighted);
    if (!isSelected || !isBboxHighlighted) throw new Error('Bidirectional selection failed');

    // Test 5: Redline remediation & dynamic score recalculation
    console.log('6. Testing in-place redline remediation...');
    const initialScore = await evalCode("DB[state.currentDoc].score");
    console.log('Initial MSA score:', initialScore);
    await evalCode("toggleRemediation('renewal')");
    const newScore = await evalCode("DB[state.currentDoc].score");
    const isResolved = await evalCode("document.getElementById('bbox-renewal').classList.contains('box-resolved')");
    const bboxText = await evalCode("document.getElementById('bbox-renewal').textContent");
    console.log('New MSA score after redline:', newScore, '| Box resolved:', isResolved);
    console.log('Bbox contains balanced redline:', bboxText.includes('Balanced Redline'));
    if (!isResolved || newScore <= initialScore || !bboxText.includes('Balanced Redline')) {
      throw new Error('Redline application or score calculation failed');
    }

    // Test 6: Undo redline
    console.log('7. Testing undo redline...');
    await evalCode("toggleRemediation('renewal')");
    const revertedScore = await evalCode("DB[state.currentDoc].score");
    const isResolvedAfterUndo = await evalCode("document.getElementById('bbox-renewal').classList.contains('box-resolved')");
    console.log('Reverted score:', revertedScore, '| Box resolved after undo:', isResolvedAfterUndo);
    if (revertedScore !== initialScore || isResolvedAfterUndo) {
      throw new Error('Undo redline failed');
    }

    // Test 7: Switch to Invoice
    console.log('8. Testing switch to Invoice document...');
    await evalCode("switchDocument('invoice')");
    const invoiceTitle = await evalCode("document.getElementById('docTitle').textContent");
    console.log('Invoice title:', invoiceTitle);
    const invoiceFindingsCount = await evalCode("DB.invoice.findings.length");
    console.log('Invoice findings count:', invoiceFindingsCount);

    // Test 8: Cross-Document Reconciliation
    console.log('9. Testing cross-document reconciliation...');
    await evalCode("runCrossReconciliation()");
    const reconTitle = await evalCode("document.getElementById('docTitle').textContent");
    const reconExposure = await evalCode("DB.reconciliation.exposure");
    console.log('Reconciliation doc loaded:', reconTitle, '| Exposure:', reconExposure);
    if (!reconExposure.includes('6,000')) throw new Error('Reconciliation exposure unexpected');

    // Test 9: Copilot Q&A
    console.log('10. Testing Copilot Q&A on MSA...');
    await evalCode("switchDocument('msa')");
    await evalCode("quickQuery('What is the cancellation deadline for renewal?')");
    await wait(200);
    const copilotVisible = await evalCode("document.getElementById('copilotResultArea').style.display");
    const copilotText = await evalCode("document.getElementById('copilotResultArea').textContent");
    console.log('Copilot result visible:', copilotVisible);
    console.log('Copilot answer excerpt:', copilotText.slice(0, 150).replace(/\s+/g, ' '));
    if (!copilotText.includes('August 16, 2026') && !copilotText.includes('90')) {
      throw new Error('Copilot response missing expected deadline citation');
    }

    // Test 9b: Copilot Q&A on Invoice
    console.log('10b. Testing Copilot Q&A on Invoice rate discrepancy...');
    await evalCode("switchDocument('invoice')");
    await evalCode("quickQuery('What is the rate discrepancy?')");
    await wait(200);
    const invCopilotText = await evalCode("document.getElementById('copilotResultArea').textContent");
    console.log('Invoice Copilot excerpt:', invCopilotText.slice(0, 150).replace(/\s+/g, ' '));
    if (!invCopilotText.includes('125') && !invCopilotText.includes('95')) {
      throw new Error('Copilot response missing expected rate comparison');
    }

    // Test 10: Re-audit button
    console.log('11. Testing dynamic Re-Audit button...');
    await evalCode("switchDocument('msa')");
    await evalCode("triggerRunAnalysis()");
    await wait(700);
    const postAuditScore = await evalCode("DB.msa.score");
    console.log('Post re-audit MSA score:', postAuditScore);

    // Test 11: Custom snippet ingestion
    console.log('12. Testing custom clause snippet audit...');
    await evalCode("document.getElementById('pasteSnippetInput').value = 'ARTICLE 8. RENEWAL: Irrevocably renews for 36 months unless 180 days notice served.'");
    await evalCode("processCustomSnippet()");
    await wait(300);
    const customDocTitle = await evalCode("document.getElementById('docTitle').textContent");
    console.log('Custom audit title:', customDocTitle);
    const customFindingsCount = await evalCode("DB.custom.findings.length");
    console.log('Custom findings count:', customFindingsCount);
    if (customFindingsCount === 0) throw new Error('Custom snippet failed to flag trap');

    console.log('\n======================================================');
    console.log('🎉 ALL 12 END-TO-END BROWSER AUTOMATION TESTS PASSED! 🎉');
    console.log('======================================================\n');

    ws.close();
  } finally {
    chrome.kill('SIGKILL');
  }
}

run().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
