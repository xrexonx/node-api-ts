import { DataSource } from "typeorm";
import { User } from "./entity";
import { UserResponse } from "./service";


export interface UserRepository {
    create(user: User): Promise<UserResponse>
    get(id: string): any
    update(user: User): any
    delete(id: string): any
}

const userResponse: UserResponse = {
    id: 0,
    username: '',
    type: '',
}

const userRepository = (db: DataSource) => ({
    create: async (user: User) => {
        try {
            await db.manager.save(user);
            userResponse.id = user.id;
            userResponse.username = user.username;
            userResponse.type = user.type;
            return userResponse;
        } catch (e: any) {
            console.log(e);
            return userResponse;
        }
    },
    get: async (id: string) => {
        console.log({id});
    },
    delete: async (id: string) => {
        console.log({id});
    },
    update: async (u: User) => {
        try {
            const repo = db.getRepository(User);
            const user = await repo.findOneBy({
                id: u.id,
            });

            if (user) {
                await repo.save(user);
            }

            return true;

        } catch (e: any) {
            console.log(e);
            return false;
        }
    },
})

export default userRepository;