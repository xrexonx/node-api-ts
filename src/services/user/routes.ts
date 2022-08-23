import { Router } from "express";
import userService from "./service";
import userRepository from "./repository";
import { db } from "../../config/db";


const userRoutes: Router = Router()

const user = userService(userRepository(db))

userRoutes.post('/user', user.create)
userRoutes.get('/user', user.get)
userRoutes.put('/user', user.update)
userRoutes.delete('/user', user.delete)


export default userRoutes