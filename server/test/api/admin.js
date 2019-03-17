const User = require('../../models/user');
const ItemCategory = require('../../models/itemcategory');

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;

module.exports = (server) => {
    let token = 'Bearer ';
    before((done) => {
        let email = 'novo@g.com';
        let password = 'rightpassword';
        let adminUser = new User({
            username: 'Eunovo',
            email, password,
            role: 'ADMIN'
        });
        adminUser.save(adminUser, (err, user) => {
            chai.request(server)
                .post('/auth/signin')
                .set('content-type', 'application/json')
                .send({
                    email, password
                })
                .end((err, res) => {
                    if (err) done(err);
                    expect(res.status).to.eq(200);
                    token = token + res.body.token;
                    done();
                });
        });
    });

    describe('/POST /', () => {
        it('should create a new User and return it', (done) => {
            chai.request(server)
                .post('/admin/')
                .set('content-type', 'application/json')
                .set('authorization', token)
                .send({
                    username: 'John',
                    email: 'john@g.com',
                    password: 'rightpassword'
                })
                .end((err, res) => {
                    if (err) done(err);
                    expect(res.body).to.deep.include({
                        username: 'John',
                        email: 'john@g.com'
                    });
                    User.findOne({ email: 'john@g.com' })
                        .then((user) => {
                            expect(user).to.deep.include({
                                username: 'John',
                                email: 'john@g.com'
                            });
                            done();
                        }).catch((err) => done(err));
                });
        });
    });

    describe('/POST /categories', () => {
        it('should create a new category and return it', (done) => {
            chai.request(server)
                .post('/admin/categories')
                .set('content-type', 'application/json')
                .set('authorization', token)
                .send({ category: 'test' })
                .end((err, res) => {
                    if (err) done(err);
                    expect(res).to.have.property('status', 200);
                    expect(res.body).to.have.property('category', 'test');
                    done();
                });
        });
    });

    describe('/POST /items', () => {
        it('should create a new item and return it', (done) => {
            let category = new ItemCategory({
                category: 'test category'
            });

            category.save(category, (err, saved) => {
                chai.request(server)
                    .post('/admin/items')
                    .set('content-type', 'application/json')
                    .set('authorization', token)
                    .send({
                        name: 'test item',
                        category: 'test category',
                        price: 500,
                        description: 'this is a test item'
                    })
                    .end((err, res) => {
                        if (err) done(err);
                        expect(res).to.have.property('status', 200);
                        expect(res.body).to.deep.include({
                            name: 'test item',
                            price: 500,
                            description: 'this is a test item'
                        });
                        done();
                    });
            });
        });
    });

}