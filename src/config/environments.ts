import dotenv from "dotenv";

dotenv.config();

// API configs
export const apiHost = process.env.API_HOST
export const apiPort = process.env.API_PORT
export const apiVersion = process.env.API_VERSION
export const apiEnv = process.env.API_ENV


// Database configs
export const dbUser = process.env.DB_USER
export const dbHost = process.env.DB_HOST
export const dbPass = process.env.DB_PASSWORD
export const dbName = process.env.DB_NAME
