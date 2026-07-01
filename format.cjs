const fs = require('fs');
const prettier = require('prettier');

async function formatFile() {
    const html = fs.readFileSync('new_web/index.html', 'utf8');
    const formatted = await prettier.format(html, { parser: 'html', printWidth: 120 });
    fs.writeFileSync('new_web/index.html', formatted);
}
formatFile();
