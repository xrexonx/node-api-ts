

import AppServer from "./server";
import { createServer, Server as HttpServer } from 'http';
import express from 'express';
import { apiHost, apiPort } from "./config/environments";
import { logger } from "./util/logger";

// Startup
(async function main() {
    try {
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
        });
    } catch (err) {
        logger.error(err);
    }
})();