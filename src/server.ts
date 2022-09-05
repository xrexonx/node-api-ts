import "reflect-metadata";
import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import AppRoutes from "./routes";
import { apiVersion } from "./config/environments";

const AppServer: Express = express();
AppServer.use(bodyParser.urlencoded({ extended: true }));
AppServer.use(bodyParser.json());

const baseUrl = `/api/${apiVersion}`
/* API Health check endpoint  */
AppServer.get(`${baseUrl}/health-check`, (req: Request, res: Response) => {
	res.send('API is running')
})

/* Load API routes */
AppServer.use(baseUrl, AppRoutes)

export default AppServer
