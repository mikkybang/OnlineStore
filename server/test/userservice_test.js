const mock = require('mock-require');
const expect = require('chai').expect;
const ResourceNotFoundError = require('../errors/resourcenotfounderror');

let userservice = require('../services/userservice');

const User = require('../models/user');

const mockUser = (mockObj) => {
    mock('../models/user', mockObj);
}; 

const reRequireUserService = () => {
    userservice = mock.reRequire('../services/userservice');
};

describe("Test UserService", () => {
    beforeEach((done) => {
        mock.stopAll();
        User.deleteMany({})
        .then(() => {
            done();
        });
    });

    describe("Create User", () => {
        it('should save a user with role "User"',
         (done) => {
            let username = 'test';
            let email = 'test@test.com';
            let password = 'testpassword';
            userservice.create_user(
                username, email, password
            ).then((user) => {
                expect(user).to.deep.include({
                    username, email,
                    role: "USER"
                });
                user.comparePassword(password, (err, isMatch) => {
                    if (err) throw err;
                    expect(isMatch).to.equal(true);
                });
                done();
            }).catch((err) => {
                expect.fail(err.message);
            });
         });

         it('should save a user with role Admin',
          (done) => {
            let username = 'test';
            let email = 'test@test.com';
            let password = 'testpassword';
            userservice.create_admin_user(
                username, email, password
            ).then((user) => {
                expect(user).to.deep.include({
                    username, email,
                    role: "ADMIN"
                });
                user.comparePassword(password, (err, isMatch) => {
                    if (err) throw err;
                    expect(isMatch).to.equal(true);
                });
                done();
            }).catch((err) => {
                expect.fail(err.message);
            });
          });
    });

    describe("Find User", () => {
        it('should throw an instance of ResourceNotFoundError', (done) => {
            let userId = '4b';
            mockUser({
                findById: (id) => {
                    expect(userId).to.equal(id);
                    return Promise.resolve(null);
                }
            });
            reRequireUserService();
           userservice.find_user_by_id(userId)
           .then((user) => {
                expect.fail('a result was returned');
           }).catch((err)  => {
                expect(err).instanceOf(ResourceNotFoundError);
                done();
            });
        });
        it('should return a user', (done) => {
            let userId = '4b';
            mockUser({
                findById: (id) => {
                    expect(userId).to.equal(id);
                    return Promise.resolve({
                        _id: id
                    });
                }
            });
            reRequireUserService();
           userservice.find_user_by_id(userId)
           .then((user) => {
               expect(user).to.deep.include({ _id: userId });
               done();
           }).catch((err)  => {
               expect.fail(err.message);
           });
        });
    });

});