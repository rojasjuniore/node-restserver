/**
 * PUERTo
 */

process.env.PORT = process.env.PORT || 3000;



/**
 * Entorno
 */

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

/**
 * Base de datos
 */

process.env.urlDB = process.env.NODE_ENV === 'dev' ? 'mongodb://localhost:27017/cafe' : process.env.MONGO_URI 
// process.env.urlDB =  'mongodb+srv://admin:Mwob7Hr5MORNy9xE@cluster0-iyttj.mongodb.net/cafe'