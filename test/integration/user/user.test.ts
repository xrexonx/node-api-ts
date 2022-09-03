// import 'module-alias/register';
import { User } from '../../../src/services/user/entity';
import { TestFactory } from "../factory";
import DoneCallback = jest.DoneCallback;

describe.skip('User resource test suites', () => {
    // Create instances
    const factory: TestFactory = new TestFactory();
    const testUser: User = new User()
    const testUserModified: User = { ...testUser, fullName: 'mockFullName', email: 'mockEmail' };

    beforeAll((done: DoneCallback) => {
        factory.init().then(_ => {
            done()
        })
    })

    afterAll((done: DoneCallback) => {
        // Closing the DB connection allows Jest to exit successfully.
        factory.close().then(_ => {
            done()
        })
    })

    describe('POST /users', () => {

        it('should return the newly created user', done => {
            factory.app
                .post('/api/v1/users')
                .send({
                    "email": "rex88@email.com.ph",
                    "fullName": "Rexon A. De los Reyes"
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(201)
                .end((err, res) => {
                    try {
                        if (err) throw err;

                        const { status } = res;
                        const user: User = res.body.data[0].attributes;

                        expect(status).toEqual(201)
                        expect(user.fullName).toEqual("Rexon A. De los Reyes")
                        expect(user.email).toEqual("rex88@email.com.ph")

                        return done();
                    } catch (err) {
                        return done(err);
                    }
                });
        });

        it('should return bad request with status 400 if no data is send', done => {
            factory.app
                .post('/api/v1/users')
                .send()
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400, done);
        });


    });

    describe('PUT /users', () => {
        it('should return the updated user', done => {
            factory.app
                .put('/api/v1/users')
                .send({
                    ...testUserModified,
                    id: 1
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    try {
                        if (err) throw err;
                        const { status } = res;
                        const user: User = res.body.data[0].attributes;

                        expect(status).toEqual(200)
                        expect(user.fullName).toEqual(testUserModified.fullName)
                        expect(user.email).toEqual(testUserModified.email)
                        return done();
                    } catch (err) {
                        return done(err);
                    }
                });
        });

    });

    describe('GET /users/1', () => {

        it('responds with single user', done => {
            factory.app
                .get('/api/v1/users/1')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    try {
                        if (err) throw err;

                        const user: User = res.body.data[0].attributes;
                        expect(user.fullName).toEqual(testUserModified.fullName)
                        expect(user.email).toEqual(testUserModified.email)

                        return done();
                    } catch (err) {
                        return done(err);
                    }
                });
        });
        it('should return user not found if id doesnt exist', (done) => {
            factory.app
                .put('/api/v1/users/9999')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    try {
                        if (err) throw err;
                        const { status } = res;
                        // const user: User = res.body

                        console.log('res.body=======', res.body);

                        expect(status).toEqual(200)
                        return done();
                    } catch (err) {
                        return done(err);
                    }
                });
        });
    });

    describe('GET /users', () => {
        it('responds with user array', (done) => {
            factory.app
                .get('/api/v1/users')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    try {
                        if (err) throw err;

                        const users: User[] = res.body.data;
                        expect(users.length).toBeGreaterThan(0)

                        expect(users[0].fullName).toEqual(testUserModified.fullName)
                        expect(users[0].email).toEqual(testUserModified.email)

                        return done();
                    } catch (err) {
                        return done(err);
                    }
                });
        });
    });

    describe('DELETE /users/1', () => {
        it('responds with status 204', done => {
            factory.app
                .delete('/api/v1/users/1')
                .set('Accept', 'application/json')
                .expect(204)
                .end((err, res) => {
                    try {
                        if (err) throw err;
                        const { status } = res;
                        console.log("Get res.body==============", res.body);
                        expect(status).toEqual(204)

                        return done();
                    } catch (err) {
                        return done(err);
                    }
                });
        });
    });
});
