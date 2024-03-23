const fs = require('fs'); 

const data = fs.readFileSync('./ficheros/README.md', 'utf8');

const newData = data.replace(/React/ig, 'Angular');

fs.writeFileSync('./ficheros/README-Angular.md', newData);