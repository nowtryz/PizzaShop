import dotenv from 'dotenv'

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const parseBool = input => parseInt(input) > 0 || (input || '').toLowerCase() === 'true'

const env = dotenv.config()
if (env.error) {
    // This error should crash whole process
    throw new Error("⚠ Could not find .env file, run `npm run install` to fix this issue")
}

export const db = {
    ip: process.env.MONGO_HOST,
    port: parseInt(process.env.MONGO_PORT, 10),
    name: process.env.MONGO_DB,
    clustered: parseBool(process.env.MONGO_CLUSTERED),
    verbose: parseBool(process.env.MONGO_VERBOSE),
}
db.uri = db.clustered ? `mongodb+srv://${db.ip}/${db.name}` : `mongodb://${db.ip}:${db.port}/${db.name}`

export const httpServer = {
    port: parseInt(process.env.PORT || process.env.HTTP_PORT, 10),
    host: process.env.HTTP_HOST,
    url: process.env.HTTP_HOST,
    proxy: parseBool(process.env.PROXY_HOST),
    sessionSecret: process.env.SESSION_SECRET || "",
    jwtSecret: process.env.JWT_SECRET || "",
    GOOGLE_OAUTH_ID: process.env.GOOGLE_OAUTH_ID,
    GOOGLE_OAUTH_SECRET: process.env.GOOGLE_OAUTH_SECRET,
}

 if (!httpServer.proxy && httpServer.port !== 80) httpServer.url += ':' + httpServer.port

export const production = process.env.NODE_ENV === 'production'
