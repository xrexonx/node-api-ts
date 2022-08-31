

import AppServer from "./server";
import { createServer, Server as HttpServer } from 'http';
import express from 'express';
import { apiHost, apiPort } from "./config/environments";
import { logger } from "./util/logger";
import { database } from "./config/database";

// Startup
(async function main() {
    try {

        // Initialize database
        await database
            .initialize()
            .then(() => logger.info(`Data Source has been initialized!`))
            .catch(err => logger.error(`Error during Data Source initialization: ${err}`))

        // Init express server
        const app: express.Application = AppServer
        const server: HttpServer = createServer(app);

        // Start express server
        server.listen(apiPort);

        server.on('listening', () => {
            logger.info(`API server is listening on port ${apiPort} in ${apiHost}`);
        });

        server.on('close', () => {
            logger.info('API server closed');
            // Close DB connection
            database.destroy().then(_ => logger.info(`Data Source connection closed!`))
        });
    } catch (err) {
        logger.error(err);
    }
})();