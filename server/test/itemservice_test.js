const mock = require('mock-require');

const expect = require("chai").expect;

const ResourceNotFoundError = require("../errors");

let itemservice = require("../services/itemservice");

const Item = require('../models/item');

const mockItem = (mockObj) => {
    mock('../models/item', mockObj);
}

const mockItemCategory = (mockObj) => {
    mock('../models/itemcategory', mockObj);
}

describe("Item Service", function () {
    beforeEach((done) => {
        mock.stopAll();
        Item.deleteMany({})
        .then(() => {
            done();
        });
    });
    describe("Create Item", () => {
        it("should throw an instance of ResourceNotFoundError",
         (done) => {
            mockItemCategory({
                findOne: (query) => {
                    return new Promise((resolve, reject) => {
                        resolve(null);
                    });
                }
            });
            itemservice = mock.reRequire('../services/itemservice');            
            itemservice.create_item("test", "test", 500, "test")
            .then((item) => {
                expect.fail();
            }).catch((err) => {
                expect(err).instanceof(ResourceNotFoundError);
                done();
            });
        });
    
        it('should save', (done) => {
            let mockCategoryId = "41224d776a326fb40f000001";
            mockItemCategory({
                findOne: (query) => {
                    return new Promise((resolve, reject) => {
                        resolve({_id: mockCategoryId});
                    });
                }
            });

            let itemservice = mock.reRequire('../services/itemservice');

            let name = "test item";
            let category = "test";
            let price = 500;
            let description = "test description";
            itemservice.create_item(name, category, price, description)
            .then((item) => {
                let category = item.category.toString();
                expect(item.name).to.equal(name);
                expect(item.price).to.equal(price);
                expect(item.description).to.equal(description);
                expect(category).to.eql(mockCategoryId);
                Item.findOne(item)
                .then((result) => {
                    expect(result.id).to.equal(item.id);
                    done();
                }).catch((err) => {
                    throw err;
                });
            })
            .catch((err) => {
                expect.fail(err.message);
                console.error(err.stack);
                done();
            });
        });

    });

    describe("Find Item by Id", () => {
        it("should throw an instance of ResourceNotFoundError",
         (done) => {
            let itemId = '';
            mockItem({
                findById: (id) => {
                    expect(id).to.equal(itemId);
                    return new Promise((resolve, reject) => {
                        resolve(null);
                    });
                }
            });
            itemservice = mock.reRequire('../services/itemservice');
            itemservice.find_item_by_id(itemId)
            .then((result) => {
                expect.fail('a result was returned');
            }).catch((err) => {
                expect(err).instanceOf(ResourceNotFoundError);
                expect(err.message).to.equal(itemId+' was not found on this server');
                done();
            });
        });
    });

});