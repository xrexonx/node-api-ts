
import { DataSource } from 'typeorm';
import { User } from "../services/user/entity";

export const db = new DataSource({
	type: 'mysql',
	host: process.env.DB_HOST,
	port: 3306,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	synchronize: true,
	logging: false,
	dropSchema: true,
	entities: [User],
	migrations: [],
	subscribers: [],
});
db.initialize();
