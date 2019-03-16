const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;

const User = require('../../models/user');

module.exports = (server) => {
    describe('/GET /me', () => {
        it('should return the current logged user', (done) => {
            let email = 'eunovo9@gmail.com';
            let password = 'testpassword';
            let user = new User({
                username: 'John',
                email,
                password
            });

            user.save(user, (err, savedUser) => {
                chai.request(server)
                    .post('/auth/signin')
                    .set('content-type', 'application/json')
                    .send({
                        email, password
                    })
                    .end((err, res) => {
                        let token = res.body.token;
                        chai.request(server)
                            .get('/auth/me')
                            .set('authorization', 'Bearer ' + token)
                            .end((err, res) => {
                                if (err) {
                                    done(err);
                                }
                                expect(res).to.have.property('status', 200);
                                expect(res.body).to.have.property('email', email);
                                done();
                            });
                    });
            });
        });

        it('should return a status 401', (done) => {
            chai.request(server)
                .get('/auth/me')
                .end((err, res) => {
                    expect(res).to.have.property('status', 401);
                    done();
                });
        });
    });

    describe('/POST /signin', () => {
        it('should return the logged user and token', (done) => {
            let email = 'eunovo9@gmail.com';
            let password = 'testpassword';
            let user = new User({
                username: 'John',
                email,
                password
            });

            user.save(user, (err, savedUser) => {
                chai.request(server)
                    .post('/auth/signin')
                    .set('content-type', 'application/json')
                    .send({
                        email, password
                    })
                    .end((err, res) => {
                        expect(res).to.have.property('status', 200);
                        expect(res.body).to.have.property('email', email);
                        expect(res.body).to.have.property('token');
                        done();
                    });
            });
        });

        it('should return a status 401 on incorrect password', (done) => {
            let email = 'eunovo9@gmail.com';
            let password = 'testpassword';
            let user = new User({
                username: 'John',
                email,
                password
            });

            user.save(user, (err, savedUser) => {
                chai.request(server)
                    .post('/auth/signin')
                    .set('content-type', 'application/json')
                    .send({
                        email, password: 'wrongpassword'
                    })
                    .end((err, res) => {
                        expect(res).to.have.property('status', 401);
                        done();
                    });
            });
        });
    });

}