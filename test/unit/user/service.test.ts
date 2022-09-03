import {User} from "../../../src/services/user/entity";
import userService from "../../../src/services/user/service";
import { Request, Response } from "express";


describe('User Service', () => {

    let request: any = {}
    let response: any = {}
    let userRepoMock: any = () => {}

    beforeAll( () => {
        request = {
            body: {
                id: 1,
                fullName: 'John Smith',
                email: 'john@smith.com',
                contacts: []
            },
            params: { id: 1 } as any
        } as Request;
        response = {
            status: (code: number) => ({
                json: (data: any) => data,
            }),
        } as Response

        const mockUser = new User()
        mockUser.id = 1
        mockUser.fullName = request.body.fullName
        mockUser.email = request.body.email

        const getResponse: GenericResponse<User> = {
            data: mockUser,
            message: '',
            code: 200
        }

        const createResponse: GenericResponse<User> = {
            data: mockUser,
            message: '',
            code: 200
        }

        const updateResponse: GenericResponse<User> = {
            data: {
                ...mockUser,
                fullName: 'Jane Smith',
                email: 'janesmith88@gmail.com'
            },
            message: '',
            code: 200
        }

        const getAllResponse: GenericResponse<User[]> = {
            data: [mockUser],
            message: '',
            code: 200
        }

        const deleteResponse: GenericResponse<string> = {
            data: request.body.id,
            message: '',
            code: 200
        }

        userRepoMock = () => ({
            get: (id: any) => Promise.resolve(getResponse),
            getAll: () => Promise.resolve(getAllResponse),
            create: (data: any) => Promise.resolve(createResponse),
            update: (data: any) => Promise.resolve(updateResponse),
            delete: (id: any) => Promise.resolve(deleteResponse)
        })
    })

    describe('when creating a user', () => {
        it('should create new user', async () => {
            const userServ = userService(userRepoMock())
            const userResponse = await userServ.create(request, response) as any
            const createdUser = userResponse.data[0]
            expect(createdUser.attributes.fullName).toEqual(request.body.fullName)
            expect(createdUser.attributes.email).toEqual(request.body.email)
        });

        describe('when creating a user without fullName', () => {
            it('should return an error', async () => {
                const userServ = userService(userRepoMock())
                request.body.fullName = '' // empty fullName
                const createResponse = await userServ.create(request, response) as any
                expect(createResponse.message).toEqual('Missing fields')
            });
        });
    });

    describe('when fetching users by id', () => {
        it('should get user by id', async () => {
            const userServ = userService(userRepoMock())
            const getResponse = await userServ.get(request, response) as any
            const user = getResponse.data[0]
            expect(user.attributes.id).toEqual(request.body.id)
        });
    });

    describe('when fetching users', () => {
        it('should get all users', async () => {
            const userServ = userService(userRepoMock())
            const userResponse = await userServ.getAll(request, response) as any
            const users = userResponse.data
            expect(users.length).toBeGreaterThan(0)
        });
    });

    describe('when updating users', () => {
        it('should update existing user', async () => {
            const userServ = userService(userRepoMock())

            // Update fields
            request.body.fullName = 'Jane Smith'
            request.body.email = 'janesmith88@gmail.com'
            const updateResponse = await userServ.update(request, response) as any
            const updatedUser = updateResponse.data[0]
            expect(updatedUser.attributes.fullName).toEqual(request.body.fullName)
            expect(updatedUser.attributes.email).toEqual(request.body.email)
        });
    });

    describe('when deleting users', () => {
        it('should delete existing user', async () => {
            const userServ = userService(userRepoMock())
            const deleteResponse = await userServ.delete(request, response) as any
            expect(deleteResponse.deletedId.data).toEqual(request.body.id)
        });
    });
});
