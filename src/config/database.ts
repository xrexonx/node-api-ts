
import { DataSource } from 'typeorm'
import { User } from "../services/user/entity"
import { Address } from "../services/address/entity"
import { Contact } from "../services/contact/entity"
import {
	dbHost,
	dbName,
	dbPass,
	dbUser
} from "./environments";

export const database = new DataSource({
	type: 'mysql',
	port: 3900,
	host: dbHost,
	username: dbUser,
	password: dbPass,
	database: dbName,
	synchronize: true,
	logging: false,
	entities: [User, Address, Contact],
	migrations: [],
	subscribers: [],
});
database.initialize();
