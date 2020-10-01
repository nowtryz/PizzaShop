import {format, loggers, transports} from "winston";

loggers.add('infoLogger', {
    level: 'info',
    transports: [new transports.File({ filename: path.join(__dirname, 'logs/info.log')})],
    format: format.printf((info) => `${new Date(Date.now()).toUTCString()} | ${info.level.toUpperCase()}  | ${info.message}`
    )
})

loggers.add('errorLogger', {
    level: 'error',
    transports: [new transports.File({ filename: path.join(__dirname, 'logs/error.log')})],
    format: format.printf((info) => `${new Date(Date.now()).toUTCString()} | ${info.level.toUpperCase()}  | ${info.message}`)
})

export default loggers.get('infoLogger')
