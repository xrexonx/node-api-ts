import "reflect-metadata";
import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import routes from "./routes";
import {
	apiPort,
	apiVersion
} from "./config/environments";


const app: Express = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(`/api/${apiVersion}`, routes)

app.get('/api/v1/health-check', (req: Request, res: Response) => {
	res.send('API is running')
})

app.listen(apiPort, () => {
	console.log(`Server running on port: ${apiPort}`);
})
