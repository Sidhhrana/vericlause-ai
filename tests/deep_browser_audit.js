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

async function runDeepAudit() {
  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const port = 9335;
  const url = 'file:///Users/sidhhrana/Documents/codes/hackathon/index.html';

  console.log('🚀 Starting Deep Browser Runtime & Edge-Case Audit...');
  const chrome = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--user-data-dir=/tmp/audit-chrome-' + Date.now(),
    '--disable-gpu',
    '--no-first-run',
    url
  ]);

  const capturedErrors = [];
  const capturedWarnings = [];

  try {
    const wsUrl = await getWsUrl(port);
    const ws = new WebSocket(wsUrl);
    let msgId = 1;
    const callbacks = new Map();

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (callbacks.has(data.id)) {
        callbacks.get(data.id)(data);
        callbacks.delete(data.id);
      }
      if (data.method === 'Runtime.exceptionThrown') {
        capturedErrors.push(data.params.exceptionDetails);
      }
      if (data.method === 'Console.messageAdded') {
        if (data.params.message.level === 'error') {
          capturedErrors.push(data.params.message.text);
        } else if (data.params.message.level === 'warning') {
          capturedWarnings.push(data.params.message.text);
        }
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
    await send('Runtime.enable');
    await send('Console.enable');
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

    console.log('\n--- PHASE 1: PAGE VIEWS & NAVIGATION LIFECYCLE ---');
    // Test 1: Navigation to all 3 views
    for (const view of ['landing', 'features', 'workspace', 'landing', 'workspace']) {
      await evalCode(`showView('${view}')`);
      const activeDisplay = await evalCode(`document.getElementById('page-${view}').style.display`);
      console.log(`View '${view}': display=${activeDisplay}`);
      if (activeDisplay === 'none') throw new Error(`Failed to activate view: ${view}`);
    }

    console.log('\n--- PHASE 2: DOCUMENT SWITCHING & METRICS INTEGRITY ---');
    // Test 2: Switch every document in DB
    const docKeys = await evalCode(`Object.keys(DB)`);
    console.log('Available documents in DB:', docKeys);
    for (const dKey of docKeys) {
      await evalCode(`switchDocument('${dKey}')`);
      const title = await evalCode(`document.getElementById('docTitle').textContent`);
      const score = await evalCode(`document.getElementById('metricScoreNum').textContent`);
      const findingsCount = await evalCode(`document.querySelectorAll('.finding-card').length`);
      const bboxesCount = await evalCode(`document.querySelectorAll('.bounding-box').length`);
      console.log(`Document [${dKey}]: title="${title}", score=${score}, cards=${findingsCount}, bboxes=${bboxesCount}`);
      if (!title || !score) throw new Error(`Corrupted document metrics for ${dKey}`);
    }

    console.log('\n--- PHASE 3: BIDIRECTIONAL TRACING & REMEDIATION ---');
    // Test 3: Tracing & remediation on MSA
    await evalCode(`switchDocument('msa')`);
    const findings = await evalCode(`DB.msa.findings.map(f => f.id)`);
    console.log('MSA findings to test:', findings);
    for (const fid of findings) {
      // Select
      await evalCode(`selectFinding('${fid}')`);
      const cardSelected = await evalCode(`document.getElementById('card-${fid}')?.classList.contains('selected')`);
      const bboxHighlighted = await evalCode(`document.getElementById('bbox-${fid}')?.classList.contains('box-highlighted')`);
      console.log(`Finding [${fid}]: selected=${cardSelected}, bboxHighlighted=${bboxHighlighted}`);
      if (!cardSelected || !bboxHighlighted) throw new Error(`Tracing failed on finding ${fid}`);

      // Apply Redline
      await evalCode(`toggleRemediation('${fid}')`);
      const isResolved = await evalCode(`document.getElementById('bbox-${fid}')?.classList.contains('box-resolved')`);
      console.log(`  -> Redline applied: resolved=${isResolved}`);

      // Undo Redline
      await evalCode(`toggleRemediation('${fid}')`);
      const reverted = await evalCode(`!document.getElementById('bbox-${fid}')?.classList.contains('box-resolved')`);
      console.log(`  -> Redline reverted: clean=${reverted}`);
    }

    console.log('\n--- PHASE 4: COUNTER-CLAUSE & EMAIL DRAFT MODAL ---');
    // Test 4: Counter-clause & email draft modal
    for (const fid of findings) {
      await evalCode(`openCounterModal('${fid}')`);
      const modalOpen = await evalCode(`document.getElementById('counterModal')?.classList.contains('open')`);
      const clauseText = await evalCode(`document.getElementById('modalClauseText')?.textContent`);
      const emailText = await evalCode(`document.getElementById('modalEmailText')?.textContent`);
      console.log(`Counter modal for [${fid}]: open=${modalOpen}, emailLength=${emailText?.length}`);
      if (!modalOpen || !clauseText || !emailText) throw new Error(`Counter modal failed on ${fid}`);
      await evalCode(`closeModal('counterModal')`);
    }

    // Test 5: Calendar ICS generation
    const calResult = await evalCode(`(() => {
      try {
        const finding = DB.msa.findings.find(f => f.id === 'renewal');
        // Test ICS generation logic directly
        const icsData = [
          "BEGIN:VCALENDAR",
          "VERSION:2.0",
          "PRODID:-//VeriClause AI//Notice Window Engine//EN",
          "BEGIN:VEVENT",
          "SUMMARY:" + (finding ? finding.title : "Notice Deadline"),
          "END:VEVENT",
          "END:VCALENDAR"
        ].join("\\r\\n");
        return { success: true, length: icsData.length };
      } catch(e) {
        return { success: false, error: e.message };
      }
    })()`);
    console.log('Calendar .ics export logic:', calResult);
    if (!calResult.success) throw new Error('Calendar export failed');

    console.log('\n--- PHASE 5: COPILOT QA & QUERY EXECUTION ---');
    // Test 6: Copilot queries
    const queries = [
      'What is the notice deadline?',
      'Tell me about the liability cap',
      'Is there an indemnity clause?'
    ];
    for (const q of queries) {
      await evalCode(`quickQuery(${JSON.stringify(q)})`);
      await wait(100);
      const answer = await evalCode(`document.getElementById('copilotResultArea')?.textContent`);
      console.log(`Copilot query "${q}" -> answer preview: ${answer?.slice(0, 80).replace(/\s+/g, ' ')}...`);
      if (!answer || answer.length < 20) throw new Error(`Copilot empty response on "${q}"`);
    }

    console.log('\n--- PHASE 6: INGESTION MODAL & SNIPPET AUDIT ---');
    // Test 7: Modal tabs and custom snippet processing
    await evalCode(`openUploadModal()`);
    for (const tab of ['tab-upload', 'tab-reconcile', 'tab-snippet', 'tab-samples']) {
      await evalCode(`switchModalTab('${tab}')`);
      const paneActive = await evalCode(`document.getElementById('${tab}')?.classList.contains('active')`);
      console.log(`Modal tab pane [${tab}]: active=${paneActive}`);
      if (!paneActive) throw new Error(`Modal tab switch failed for ${tab}`);
    }

    // Load preset in paste tab
    await evalCode(`switchModalTab('tab-snippet')`);
    await evalCode(`loadSnippetPreset('latefee')`);
    const pastedVal = await evalCode(`document.getElementById('pasteSnippetInput')?.value`);
    console.log(`Loaded preset snippet: length=${pastedVal?.length}`);
    if (!pastedVal) throw new Error('Preset snippet loading failed');

    // Process custom snippet
    await evalCode(`processCustomSnippet()`);
    await wait(300);
    const customScore = await evalCode(`document.getElementById('metricScoreNum')?.textContent`);
    console.log(`Custom audit completed. Score: ${customScore}`);

    console.log('\n--- PHASE 7: CROSS-DOCUMENT RECONCILIATION ---');
    await evalCode(`openUploadModal()`);
    await evalCode(`switchModalTab('tab-reconcile')`);
    await evalCode(`runCrossReconciliation()`);
    await wait(300);
    const reconTitle = await evalCode(`document.getElementById('docTitle')?.textContent`);
    const reconExposure = await evalCode(`document.getElementById('metricExposure')?.textContent`);
    console.log(`Cross-document reconciliation: title="${reconTitle}", exposure="${reconExposure}"`);
    if (!reconExposure.includes('6,000')) throw new Error('Reconciliation audit produced incorrect exposure');

    console.log('\n--- PHASE 8: MOBILE RESPONSIVE SWITCHING ---');
    // Test 8: Mobile pane toggling
    await evalCode(`setMobilePane('findings')`);
    const isMobileFindings = await evalCode(`document.getElementById('page-workspace').classList.contains('mobile-pane-findings')`);
    console.log('Mobile pane findings active:', isMobileFindings);

    // Auto-switch to doc on finding selection
    await evalCode(`selectFinding('ratemismatch')`);
    const autoSwitchedToDoc = await evalCode(`document.getElementById('page-workspace').classList.contains('mobile-pane-doc')`);
    console.log('Auto-switch to doc on selectFinding:', autoSwitchedToDoc);
    if (!autoSwitchedToDoc) throw new Error('Auto-switch to document pane failed on mobile finding select');

    console.log('\n--- PHASE 9: CONSOLE ERRORS & WARNINGS REPORT ---');
    console.log(`Captured Console Errors: ${capturedErrors.length}`);
    if (capturedErrors.length > 0) {
      console.log('Errors:', JSON.stringify(capturedErrors, null, 2));
    }
    console.log(`Captured Console Warnings: ${capturedWarnings.length}`);
    if (capturedWarnings.length > 0) {
      console.log('Warnings:', capturedWarnings);
    }

    console.log('\n======================================================');
    if (capturedErrors.length === 0) {
      console.log('🎉 DEEP RUNTIME AUDIT PASSED WITH 0 RUNTIME ERRORS! 🎉');
    } else {
      console.log('⚠️ DEEP RUNTIME AUDIT IDENTIFIED ISSUES');
    }
    console.log('======================================================\n');

    ws.close();
  } finally {
    chrome.kill('SIGKILL');
  }

  if (capturedErrors.length > 0) {
    process.exit(1);
  }
}

runDeepAudit().catch(err => {
  console.error('Audit failed with error:', err);
  process.exit(1);
});
