const fs = require('fs');
let html = fs.readFileSync('new_web/index.html', 'utf8');

// Ensure there is exactly one </head> before <body>
html = html.replace(/<\/head>/g, ''); 
html = html.replace(/<body/i, '</head>\n<body');

fs.writeFileSync('new_web/index.html', html);
