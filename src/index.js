import { initDatabaseNoError } from "./initDatabase";
import {httpServer} from "../config.json";
import logger from "./logger";
import chalk from "chalk";
import app from "./server";

initDatabaseNoError()
.then(() => {
    // start
    app.listen(httpServer.port, () => {
        logger.info(chalk.green(`Server is running on port: ${httpServer.port}`))
    })
})
