const mongoose = require('mongoose');
const Item = require('../models/item');
const ItemCategory = require('../models/itemcategory');

const chai  = require('chai');
const chaiHttp = require('chai-http');

const server = require('../app');

chai.use(chaiHttp);
const should = chai.should;
const expect = chai.expect;


chai.use(chaiHttp);

const mock = require('mock-require');

const mockItemService = (mockObj) => {
    mock('../services/itemservice', mockObj);
};

const reRequireApp = () => {
    server = mock.reRequire('../app');
};

describe('Test Items API', () => {
    beforeEach((done) => {
        Item.deleteMany({})
        .then(() => {
            ItemCategory.deleteMany({})
            .then(() => {
                done();
            });
        });
    });

    describe('/GET /items/', () => {
        it('should return an empty array', (done) => {
            chai.request(server)
            .get('/items/')
            .end((err, res) => {
                if (err) {
                    expect.fail(err.message);
                }
                expect(res).to.have.property('status').eql(200);
                expect(res.body).to.be.a('array')
                .to.deep.have.members([]);
                done();
            });
        });
    });

    describe('/GET /items/:id', () => {
        it('should get item with a given id', (done) => {
            let category = new ItemCategory({
                category: 'test cat'
            });
            category.save(category, (err, category) => {
                let item = new Item({
                    name: 'test item',
                    price: 500,
                    category: category.id,
                    description: 'this is a test item'
                });

                item.save(item, (err, item) => {
                    chai.request(server)
                    .get('/items/id/'+item.id)
                    .end((err, res) => {
                        if (err) {
                            console.error(err);
                            expect.fail(err.message);
                        }
                        category = category._doc;
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.a('object');
                        expect(res.body).to.have.property('_id')
                        .equal(item.id);
                        expect(res.body).to.have.property('name');
                        expect(res.body).to.have.property('price');
                        expect(res.body).to.have.property('category')
                        .to.be.a('object')
                        .to.have.property('category').equal(category.category);
                        expect(res.body).to.have.property('description');
                        done();
                    });
                });
            });
        });
        
        it('should return a 404 status code', (done) => {
            let itemId = '41224d776a326fb40f000001';
            chai.request(server)
            .get('/items/id/'+itemId)
            .end((err, res) => {
                expect(res).to.have.property('status').to.eql(404);
                expect(res.body).to.have.property('errors')
                .to.include.members([ itemId+' was not found on this server' ]);
                done();
            });
        });
    });


});