const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
const appJs = fs.readFileSync(path.join(__dirname, '../app.js'), 'utf8');
const forensicsJs = fs.readFileSync(path.join(__dirname, '../forensics.js'), 'utf8');

console.log('=== 1. AUDITING JS -> DOM ID REFERENCES ===');
// Find all document.getElementById("...") in app.js and forensics.js
const idRegex = /document\.getElementById\(\s*["']([^"']+)["']\s*\)/g;
const referencedIds = new Set();
let match;
while ((match = idRegex.exec(appJs)) !== null) {
  referencedIds.add({ id: match[1], file: 'app.js' });
}
while ((match = idRegex.exec(forensicsJs)) !== null) {
  referencedIds.add({ id: match[1], file: 'forensics.js' });
}

// Find all id="..." in index.html and dynamic templates in JS
const htmlIdRegex = /id=["']([^"']+)["']/g;
const declaredIds = new Set();
while ((match = htmlIdRegex.exec(html)) !== null) {
  declaredIds.add(match[1]);
}

// Also check dynamic IDs created in app.js or forensics.js (e.g. bbox-, card-)
const missingStaticIds = [];
for (const item of referencedIds) {
  // Check if id is declared in HTML
  if (!declaredIds.has(item.id)) {
    // Check if dynamically created in JS
    const isDynamic = appJs.includes(`id="${item.id}"`) || 
                      appJs.includes(`id='${item.id}'`) ||
                      forensicsJs.includes(`id="${item.id}"`) ||
                      forensicsJs.includes(`id='${item.id}'`) ||
                      item.id.startsWith('bbox-') || 
                      item.id.startsWith('card-');
    if (!isDynamic) {
      missingStaticIds.push(item);
    }
  }
}

if (missingStaticIds.length > 0) {
  console.log('⚠️ Potential missing DOM IDs referenced in JS:');
  missingStaticIds.forEach(m => console.log(`   - ID "${m.id}" in ${m.file}`));
} else {
  console.log('✓ All getElementById references match elements in HTML or dynamic templates.');
}

console.log('\n=== 2. AUDITING HTML ONCLICK / EVENT HANDLERS ===');
// Find all onclick="..." in index.html
const onclickRegex = /on(?:click|change|keydown|keyup|submit)=["']([^"']+)["']/g;
const declaredFunctions = new Set();

// Extract top-level function names in app.js
const fnRegex = /(?:function\s+([a-zA-Z0-9_$]+)\s*\(|window\.([a-zA-Z0-9_$]+)\s*=|(?:const|let|var)\s+([a-zA-Z0-9_$]+)\s*=\s*(?:function|\([^)]*\)\s*=>))/g;
while ((match = fnRegex.exec(appJs)) !== null) {
  declaredFunctions.add(match[1] || match[2] || match[3]);
}
while ((match = fnRegex.exec(forensicsJs)) !== null) {
  declaredFunctions.add(match[1] || match[2] || match[3]);
}

const missingFns = new Set();
while ((match = onclickRegex.exec(html)) !== null) {
  const code = match[1];
  // extract function calls e.g. foo(bar) -> foo
  const callMatches = code.matchAll(/([a-zA-Z0-9_$]+)\s*\(/g);
  for (const cm of callMatches) {
    const fnName = cm[1];
    // Ignore native JS / control structures
    if (['alert', 'confirm', 'console', 'parseInt', 'parseFloat', 'setTimeout', 'if', 'this'].includes(fnName)) continue;
    if (!declaredFunctions.has(fnName)) {
      missingFns.add({ fn: fnName, snippet: code.trim().slice(0, 50) });
    }
  }
}

if (missingFns.size > 0) {
  console.log('⚠️ Missing functions called from HTML:');
  missingFns.forEach(f => console.log(`   - Function "${f.fn}" called in: ${f.snippet}`));
} else {
  console.log('✓ All onclick/event handlers in index.html match defined functions.');
}

console.log('\n=== 3. AUDITING ASSET & SAMPLE FILE REFERENCES ===');
// Check referenced files in app.js and index.html
const fileRefRegex = /["'](samples\/[^"']+|hero-bg\.jpg|styles\.css|app\.js|forensics\.js)["']/g;
const referencedFiles = new Set();
while ((match = fileRefRegex.exec(html)) !== null) referencedFiles.add(match[1]);
while ((match = fileRefRegex.exec(appJs)) !== null) referencedFiles.add(match[1]);

const missingFiles = [];
for (const f of referencedFiles) {
  const fullPath = path.join(__dirname, '..', f);
  if (!fs.existsSync(fullPath)) {
    missingFiles.push(f);
  }
}

if (missingFiles.length > 0) {
  console.log('⚠️ Missing asset or sample files:');
  missingFiles.forEach(f => console.log(`   - File not found: ${f}`));
} else {
  console.log(`✓ All ${referencedFiles.size} referenced files and sample datasets exist on disk.`);
}
