import { DataSource } from "typeorm";
import { User } from "./entity";
import { Contact } from "../contact/entity";
import { Address } from "../address/entity";

export interface UserRepository {
    get(id: number): Promise<User>
    getAll(): Promise<User[]>
    create(user: User): Promise<User>
    update(user: User): Promise<User>
    delete(id: string): Promise<string>
}

const userRepository = (db: DataSource) => ({
    create: async (user: User) => {
        try {
            const createdUser = await db.manager.save(user);

            // Save user contacts
            if (user.contacts.length > 0) {
                const contacts = user.contacts.map(contact => {
                    const newContact = new Contact()
                    newContact.userId = user.id
                    newContact.number = contact.number
                    newContact.type = contact.type
                    return newContact
                })
                await db.manager.save(contacts)
            }

            // Save user addresses
            if (user.addresses.length > 0) {
                const addresses = user.addresses.map(address => {
                    const newAddress = new Address()
                    newAddress.userId = user.id
                    newAddress.name = address.name
                    newAddress.type = address.type
                    return newAddress
                })
                await db.manager.save(addresses)
            }

            return createdUser
        } catch (e: any) {
            console.log('userRepository:create error:', (e as Error).message);
            return new User();
        }
    },
    getAll: async () => {
        try {
            return await db.getRepository(User).find();
        } catch (e: any) {
            console.log('userRepository:get error:', (e as Error).message);
            const result: User[] = [];
            return result;
        }
    },
    get: async (id: number) => {

        const response = new User()
        console.log({response});

        try {
            const user = await db.getRepository(User).findOneBy({ id: id })
            if (user) {
                response.id =  user.id
                response.fullName =  user.fullName
                response.email =  user.email
                response.contacts =  user.contacts
                response.addresses =  user.addresses
            }
            return response
        } catch (e: any) {
            console.log('userRepository:get error:', (e as Error).message);
            return response
        }
    },
    update: async (user: User) => {
        try {
            const repo = db.getRepository(User);
            const result = await repo.findOneBy({
                id: user.id,
            });

            // Save user contacts
            if (user.contacts.length > 0) {
                const contacts = user.contacts.map(contact => {
                    const newContact = new Contact()
                    newContact.id = contact.id
                    newContact.userId = user.id
                    newContact.number = contact.number
                    newContact.type = contact.type
                    return newContact
                })
                await db.manager.save(contacts)
            }

            // Save user contacts
            if (user.addresses.length > 0) {
                const addresses = user.addresses.map(address => {
                    const addr = new Address()
                    addr.id = address.id
                    addr.userId = user.id
                    addr.name = address.name
                    addr.type = address.type
                    return addr
                })
                await db.manager.save(addresses)
            }

            return result ? await repo.save(user) : new User()

        } catch (e: any) {
            console.log('userRepository:update error:', (e as Error).message);
            return new User();
        }
    },
    delete: async (id: string) => {
        try {
            await db.getRepository(User).delete(id)
            return id
        } catch (e: any) {
            console.log('userRepository:delete error:', (e as Error).message);
            return "";
        }
    },
})

export default userRepository;