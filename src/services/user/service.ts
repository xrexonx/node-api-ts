import { Request, Response } from "express";
import { UserRepository } from "./repository";
import { User } from "./entity";
import { formatResponse, JSONResponse } from "../../util/reponse";

function createResponse<T>(res: Response, userResponse: GenericResponse<T>) {
    const response = res.status(userResponse.code)
    return userResponse.code === 200
        ? response.json(formatResponse<T>(userResponse.data, 'users') as JSONResponse)
        : response.json({message: userResponse.message});
}

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
                return createResponse<User>(res, await userRepo.create(newUser))
            } else {
                return res.status(400).json({message: 'Missing fields'});
            }

        } catch (e: any) {
            res.status(e.code).json(e.message);
        }
    },
    getAll: async (req: Request, res: Response) => {
        try {
            return createResponse<User[]>(res, await userRepo.getAll())
        } catch (e: any) {
            res.status(e.code).json(e.message);
        }
    },
    get: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const userResponse = await userRepo.get(parseInt(id));

            return userResponse.data.id
                ? createResponse<User>(res, userResponse)
                : res.status(200).json({message: 'No user found'});

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

            return createResponse<User>(res, await userRepo.update(user))

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