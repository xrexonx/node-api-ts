import { DataSource } from "typeorm";
import { User } from "./entity";
import { Contact } from "../contact/entity";
import { Address } from "../address/entity";
import { logger } from "../../util/logger";

export interface UserRepository {
    get(id: number): Promise<GenericResponse<User>>
    getAll(): Promise<GenericResponse<User[]>>
    create(user: User): Promise<GenericResponse<User>>
    update(user: User): Promise<GenericResponse<User>>
    delete(id: number): Promise<GenericResponse<string>>
    updateStatus(id: number, status: boolean): Promise<GenericResponse<string>>
}

function createResponse<T>(data: T, message: string, code: number): GenericResponse<T> {
    return { data, message, code }
}

function errorResponse<T>(action: string, message: string, data: T) {
    const errMsg = `UserRepository:${action} error: ${message}`
    logger.error(errMsg);
    return createResponse<T>(data, errMsg, 500)
}

const userRepository = (db: DataSource) => ({
    create: async (user: User) => {
        try {
            const createdUser = await db.manager.save(user);

            // Save user contacts - TODO: transfer to contact service
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

            // Save user addresses - TODO: transfer to address service
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
            return createResponse<User>(createdUser, "Successfully created", 201)
        } catch (e: any) {
            return errorResponse<User>('create', (e as Error).message, new User())
        }
    },
    getAll: async () => {
        try {
            const users = await db.getRepository(User).find();
            return createResponse<User[]>(users, "Successfully fetched users", 200)
        } catch (e: any) {
            const users: User[] = [];
            return errorResponse<User[]>('getAll', (e as Error).message, users)
        }
    },
    get: async (id: number) => {

        const response = new User()
        try {
            const user = await db.getRepository(User).findOneBy({ id: id })
            if (user) {
                response.id =  user.id
                response.fullName =  user.fullName
                response.email =  user.email
                response.contacts =  user.contacts
                response.addresses =  user.addresses
            }
            return createResponse<User>(response, `Successfully fetched user id: ${response.id}`, 200)
        } catch (e: any) {
            return errorResponse<User>('get', (e as Error).message, response)
        }
    },
    update: async (user: User) => {
        try {
            const repo = db.getRepository(User);
            const result = await repo.findOneBy({id: user.id});

            // Save user contacts - TODO: transfer to contact service
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

            // Save user addresses - TODO: transfer to address service
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

            const updatedUser = result ? await repo.save(user) : new User()
            return createResponse<User>(updatedUser, "", 200)

        } catch (e: any) {
            return errorResponse<User>('update', (e as Error).message, new User())
        }
    },
    delete: async (id: number) => {
        try {
            const repo = db.getRepository(User)
            const result = await repo.findOneBy({ id });
            let deletedId = ""
            if (result) {
                await repo.delete(id)
                deletedId = id.toString()
            }
            return createResponse<string>(deletedId, "", 200)
        } catch (e: any) {
            return errorResponse<string>('delete', (e as Error).message, '')
        }
    },
    updateStatus: async (id: number, status: boolean) => {
        try {
            const repo = db.getRepository(User)
            const user = await repo.findOneBy({ id });
            let updatedId = ""
            if (user) {
                await repo.update(id,{ isActive: status });
                updatedId = id.toString()
            }
            return createResponse<string>(updatedId, "Successfully updated status", 200)
        } catch (e: any) {
            return errorResponse<string>('updateStatus', (e as Error).message, '')
        }
    },
})

export default userRepository;