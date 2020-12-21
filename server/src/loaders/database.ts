import mongoose from "mongoose";
import chalk from "chalk";
import logger from "./logger";
import {db} from "./config";

export const initDatabase = async (options={}) => {
    logger.info(chalk.green("Connecting to database"))

    if (db.verbose) {
        mongoose.set('debug', true)
        logger.info('MongoDB verbose mode enabled')
    }

    // As from https://stackoverflow.com/questions/51960171/node63208-deprecationwarning-collection-ensureindex-is-deprecated-use-creat
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    await mongoose.connect(db.uri, {useNewUrlParser: true, useUnifiedTopology : true, ...options})

    logger.info(chalk.green("Connected to database"))
}

export const initDatabaseNoError =  async (options={}) => {
    try {
        await initDatabase(options)
    }
    catch (error) {
        console.error(chalk.red(`Connection error: ${error.stack}`))
        process.exit(1)
    }
}

export const closeConnection = () => {
    mongoose.connection.close()
}
