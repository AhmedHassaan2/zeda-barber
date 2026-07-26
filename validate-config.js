const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\A.Hassan\\.config\\opencode\\opencode.jsonc', 'utf8');
const stripped = content.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
try {
  JSON.parse(stripped);
  console.log('Valid JSON');
} catch(e) {
  console.log('Invalid JSON:', e.message);
}