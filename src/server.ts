import "reflect-metadata";
import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import routes from "./routes";
import { apiVersion } from "./config/environments";

const AppServer: Express = express();
AppServer.use(bodyParser.urlencoded({ extended: true }));
AppServer.use(bodyParser.json());

AppServer.use(`/api/${apiVersion}`, routes)

AppServer.get('/api/v1/health-check', (req: Request, res: Response) => {
	res.send('API is running')
})

export default AppServer
