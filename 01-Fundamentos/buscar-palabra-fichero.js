const fs = require('fs'); 

const data = fs.readFileSync('./ficheros/README.md', 'utf8');

const palabras = data.split(' ');

const palabrasReact = (data.match(/react/ig) ?? []).length;


console.log('Palabras:', palabras.length);
console.log('Veces que aparece la palabra React:', palabrasReact);