/**
 * PUERTO
 */

process.env.PORT = process.env.PORT || 3000;



/**
 * ENTORNO
 */

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

/**
 * Base de datos
 */

process.env.urlDB = process.env.NODE_ENV === 'dev' ? 'mongodb://localhost:27017/cafe' : process.env.MONGO_URI

/**
 * Vencimiento del token
 */

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30

/**
* SEED de autenticacion
*/

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';