import { initDatabaseNoError } from "./loaders/database";
import {httpServer} from "./loaders/config";
import logger from "./loaders/logger";
import chalk from "chalk";
import app from "./loaders/server";

initDatabaseNoError()
.then(() => {
    // start
    app.listen(httpServer.port, () => {
        logger.info(chalk.green(`Server is running on port: ${httpServer.port}`))
    })
})
