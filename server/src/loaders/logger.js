import {format, transports, createLogger} from "winston";
import path from 'path'

export default createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    defaultMeta: { service: 'user-service' },
    format: format.printf(({level, message}) =>
        `${new Date(Date.now()).toUTCString()} | ${level.toUpperCase()}  | ${message}`
    ),
    transports: [
        new transports.File({ filename: path.join(process.cwd(), 'logs/error.log'), level: 'error'}),
        new transports.File({ filename: path.join(process.cwd(), 'logs/info.log')}),
        new transports.Console(),
    ],
});
