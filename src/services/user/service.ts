import {Request, response, Response} from "express";
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

            // TODO: Handle proper input validation
            if (fullName) {
                newUser.email = email
                newUser.fullName = fullName
                newUser.addresses = addresses || []
                newUser.contacts = contacts || []

                const user = await userRepo.create(newUser);
                const response: JSONResponse = buildResponse<User>(user, 'users')
                return res.status(201).json(response);
            } else {
                return res.status(400).json({message: 'Missing fields'});
            }

        } catch (e: any) {
            res.status(e.code).json(e.message);
        }
    },
    getAll: async (req: Request, res: Response) => {
        try {
            const response: JSONResponse = buildResponse<User[]>(await userRepo.getAll(), 'users')
            return res.status(200).json(response);
        } catch (e: any) {
            res.status(e.code).json(e.message);
        }
    },
    get: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const user = await userRepo.get(parseInt(id));

            const response = res.status(200)

            return user.id
            ? response.json(buildResponse<User>(user, 'users'))
            : response.json({message: 'No user found'});

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

            const user = new User()

            user.id = id
            user.email = email
            user.fullName = fullName
            user.addresses = addresses || []
            user.contacts = contacts || []

            const updatedUser = await userRepo.update(user);
            const response: JSONResponse = buildResponse<User>(updatedUser, 'users')
            return res.status(200).json(response);

        } catch (e: any) {
            res.status(e.code).json(e.message);
        }
    },

    delete: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const deletedId = await userRepo.delete(id)
            const response = res.status(200)
            return !!deletedId
                ? response.json({deletedId: deletedId})
                : response.json({message: 'No user found'});
        } catch (e: any) {
            res.status(e.code).json(e.message);
        }
    }
})

export default userService;