const { getPokemonByID } = require("./js-foundation/06-promises");

const buildLogger = require('./libraries/logger.adapter');

const logger = buildLogger('app.js');

logger.log('Hola mundo');
logger.error('Esto es un error');

// getPokemonByID(4)
// .then(name => console.log(name))
// .catch(err => console.log('El error es', err.message))

