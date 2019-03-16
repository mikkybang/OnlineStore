const mock = require('mock-require');
const expect = require('chai').expect;
let authservice = require('../../services/authservice');

const User = require('../../models/user');

const mockUser = (mockObj) => {
    mock('../../models/user', mockObj);
};

const reRequire = () => {
    authservice = mock.reRequire('../../services/authservice');
};

module.exports = (app) => {
    describe('Test signin', () => {
        let email = 'eunovo9@gmail.com';
        let password = 'testpassword';
        let user = new User({
            username: 'John',
            email,
            password
        });
        it('should return a token and the user matching the given login details', (done) => {
            user.save(user, (err, user) => {
                authservice.signin(email, password)
                    .then((result) => {
                        if (result == null) {
                            expect.fail('the given login details did not match any user');
                        }
                        expect(result).to.have.property('email').to.eq(email);
                        expect(result).to.have.property('token');
                        done();
                    }).catch((err) => {
                        expect.fail(err.message);
                    });
            });
        });

        it('should return null for wrong email', (done) => {
            user.save(user, (err, user) => {
                authservice.signin('eunovo9@yahoo.com', password)
                    .then((result) => {
                        expect(result).to.be.a('null');
                        done();
                    }).catch((err) => {
                        expect.fail(err.message);
                    });
            });
        });

        it('should return null for wrong password', (done) => {
            user.save(user, (err, user) => {
                authservice.signin(email, 'wrongpassword')
                    .then((result) => {
                        expect(result).to.be.a('null');
                        done();
                    }).catch((err) => {
                        expect.fail(err.message);
                    });
            });
        });
    });

}