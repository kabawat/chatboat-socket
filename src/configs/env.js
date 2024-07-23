require('dotenv').config()
const SECRET = {
    JWT_SECRET: process.env.JWT_SECRET,
    CORS_ORIGIN: process.env.CORS_ORIGIN,
    DB_URL: process.env.DB_URL,
    PORT: process.env.PORT || 1729,
    ENVIRONMENT: process.env.ENVIRONMENT || 'dev',
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_URI_DEV: process.env.MONGODB_URI_DEV,
}
module.exports = SECRET;