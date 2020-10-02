import mongoose from "mongoose";
import {db} from "../config.json";
import logger from "./logger";
import chalk from "chalk";

export const initDatabase = async (options={}) => {
    logger.info(chalk.green("Connecting to database"))

    await mongoose.connect(
        `mongodb://${db.ip}:${db.port}/${db.name}`,
        {useNewUrlParser: true, useUnifiedTopology : true, ...options}
    )

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
