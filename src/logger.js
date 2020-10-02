import {format, transports, createLogger} from "winston";
import path from 'path'

export default createLogger({
    level: 'info',
    defaultMeta: { service: 'user-service' },
    format: format.printf(({level, message}) =>
        `${new Date(Date.now()).toUTCString()} | ${level.toUpperCase()}  | ${message}`
    ),
    transports: [
        new transports.File({ filename: path.join(__dirname, 'logs/error.log'), level: 'error'}),
        new transports.File({ filename: path.join(__dirname, 'logs/info.log')}),
        new transports.Console(),
    ],
});
