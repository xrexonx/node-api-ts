import { Router } from "express";
import userService from "./service";
import userRepository from "./repository";
import { database } from "../../config/database";

const users: Router = Router()

const repository = userRepository(database)
const user = userService(repository)

users.post('/users', user.create)
users.put('/users', user.update)
users.get('/users', user.getAll)
users.get('/users/:id', user.get)
users.delete('/users/:id', user.delete)


export default users