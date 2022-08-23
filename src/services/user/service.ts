import { Request, Response } from "express";
import { UserRepository } from "./repository";


export interface UserRequest {
    id: number;
    username: string;
    password: string;
    type: string;
    validate(): void;
}

export interface UserResponse {
    id: number;
    username: string;
    type: string;
}


const userService = (userRepo: UserRepository) => ({
    create: async (req: Request, res: Response) => {
        try {
            const userRequest: any = {}
            userRequest.username = req.body.username;
            userRequest.password = req.body.password;

            const user = await userRepo.create(userRequest);
            return res.status(200).json(user);
        } catch (e: any) {
            res.status(e.code).json(e.message);
        }
    },
    update: async (req: any, res: Response) => {
        try {
            const userRequest: any = {}
            userRequest.id = req.user.id;

            const user = await userRepo.update(userRequest);
            return res.status(200).json(user);
        } catch (e: any) {
            res.status(e.code).json(e.message);
        }
    },
    get: async (req: any, res: Response) => {
        try {
            return res.status(200).json({});
        } catch (e: any) {
            res.status(e.code).json(e.message);
        }
    },
    delete: async (req: any, res: Response) => {
        try {
            return res.status(200).json({});
        } catch (e: any) {
            res.status(e.code).json(e.message);
        }
    }
})

export default userService;