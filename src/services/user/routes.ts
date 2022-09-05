import { Router } from "express";
import userService from "./service";
import userRepository from "./repository";
import { database } from "../../config/database";

const userRoutes: Router = Router()

const repository = userRepository(database)
const user = userService(repository)

userRoutes.post('/users', user.create)
userRoutes.put('/users', user.update)
userRoutes.get('/users', user.getAll)
userRoutes.get('/users/:id', user.get)
userRoutes.patch('/users/:id', user.updateStatus)
userRoutes.delete('/users/:id', user.delete)


export default userRoutes