import mongoose from "mongoose";
import {db} from "../config.json";
import logger from "./logger";
import chalk from "chalk";

export default async () => {
    try {
        await mongoose.connect(
            `mongodb://${db.ip}:${db.port}/${db.name}`,
            {useNewUrlParser: true, useUnifiedTopology : true}
        )

        console.log(chalk.green(`Connected to database`))
        logger.info("Connected to database");
    } catch (error) {
        console.error(chalk.red(`Connection error: ${error.stack}`))
        process.exit(1)
    }
}
