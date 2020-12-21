import dotenv from 'dotenv'

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const env = dotenv.config()
if (env.error) {
    // This error should crash whole process
    throw new Error("⚠ Could not find .env file, run `npm run install` to fix this issue")
}

export const db = {
    ip: process.env.MONGO_HOST,
    port: parseInt(process.env.MONGO_PORT, 10),
    name: process.env.MONGO_DB,
    verbose: parseInt(process.env.MONGO_VERBOSE) > 0 || (process.env.MONGO_VERBOSE || '').toLowerCase() === 'true',
}
db.uri = `mongodb://${db.ip}:${db.port}/${db.name}`

export const httpServer = {
    port: parseInt(process.env.PORT, 10),
    host: process.env.HOST,
    url: process.env.HOST,
    sessionSecret: process.env.SESSION_SECRET || "",
    jwtSecret: process.env.JWT_SECRET || "",
    GOOGLE_OAUTH_ID: process.env.GOOGLE_OAUTH_ID,
    GOOGLE_OAUTH_SECRET: process.env.GOOGLE_OAUTH_SECRET,
}

if (httpServer.port !== 80) httpServer.url += ':' + httpServer.port
