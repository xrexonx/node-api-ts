import { Request, Response } from "express";
import { UserRepository } from "./repository";
import { User } from "./entity";
import {buildResponse, JSONResponse} from "../../util/reponse";


const userService = (userRepo: UserRepository) => ({
    create: async (req: Request, res: Response) => {
        try {
            const {
                email,
                fullName,
                addresses,
                contacts
            } = req.body

            const newUser = new User()

            newUser.email = email
            newUser.fullName = fullName
            newUser.addresses = addresses || []
            newUser.contacts = contacts || []

            const user = await userRepo.create(newUser);
            return res.status(201).json(user);

        } catch (e: any) {
            res.status(e.code).json(e.message);
        }
    },
    getAll: async (req: Request, res: Response) => {
        try {
            return res.status(200).json(await userRepo.getAll());
        } catch (e: any) {
            res.status(e.code).json(e.message);
        }
    },
    get: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const user = await userRepo.get(parseInt(id));
            // const jResponse: JSONResponse<User> = buildResponse(user, 'users')
            return res.status(200).json(user);
        } catch (e: any) {
            res.status(e.code).json(e.message);
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const {
                id,
                email,
                fullName,
                addresses,
                contacts
            } = req.body

            const newUser = new User()

            newUser.id = id
            newUser.email = email
            newUser.fullName = fullName
            newUser.addresses = addresses || []
            newUser.contacts = contacts || []

            const updatedUser = await userRepo.update(newUser);
            return res.status(200).json(updatedUser);

        } catch (e: any) {
            res.status(e.code).json(e.message);
        }
    },

    delete: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const deletedId = userRepo.delete(id)
            return res.status(200).json({deletedId});
        } catch (e: any) {
            res.status(e.code).json(e.message);
        }
    }
})

export default userService;