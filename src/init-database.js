import mongoose from "mongoose";
import {db} from "../config.json";
import logger from "./logger";
import chalk from "chalk";

export const initDatabase = async (options={}) => {
    console.log(chalk.green(`Connecting to database`))
    logger.info("Connecting to database");

    await mongoose.connect(
        `mongodb://${db.ip}:${db.port}/${db.name}`,
        {useNewUrlParser: true, useUnifiedTopology : true, ...options}
    )

    console.log(chalk.green(`Connected to database`))
    logger.info("Connected to database");
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

export default initDatabase
