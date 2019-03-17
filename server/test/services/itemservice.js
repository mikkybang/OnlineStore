const mock = require('mock-require');

const expect = require("chai").expect;

const ResourceNotFoundError = require("../../errors/resourcenotfounderror");

const itemService = require("../../services/itemservice");

const Item = require('../../models/item');
const itemcategory = require('../../models/itemcategory');

const mockItem = (mockObj) => {
    mock('../../models/item', mockObj);
}

const mockItemCategory = (mockObj) => {
    mock('../../models/itemcategory', mockObj);
}

const reRequireItemService = () => {
    itemservice = require('../../services/itemservice');
}

module.exports = (server) => {
    beforeEach((done) => {
        mock.stopAll();
        done();
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
                let mockItemService = mock.reRequire('../../services/itemservice');
                mockItemService.create_item("test", "test", 500, "test")
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
                        resolve({ _id: mockCategoryId });
                    });
                }
            });

            let mockItemService = mock.reRequire('../../services/itemservice');

            let name = "test item";
            let category = "test";
            let price = 500;
            let description = "test description";
            mockItemService.create_item(name, category, price, description)
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
                let itemId = '4b';
                mockItem({
                    findById: (id) => {
                        expect(id).to.equal(itemId);
                        return new Promise((resolve, reject) => {
                            resolve(null);
                        });
                    }
                });
                let mockItemService = mock.reRequire('../../services/itemservice');
                mockItemService.find_item_by_id(itemId)
                    .then((result) => {
                        expect.fail('a result was returned');
                    }).catch((err) => {
                        expect(err).instanceOf(ResourceNotFoundError);
                        expect(err.message).to.equal(itemId + ' was not found on this server');
                        done();
                    });
            });

        it("should return an item", (done) => {
            let itemId = '4b';
            mockItem({
                findById: (id) => {
                    expect(id).to.equal(itemId);
                    return Promise.resolve({
                        _id: id
                    });
                }
            });
            let mockItemService = mock.reRequire('../../services/itemservice');
            mockItemService.find_item_by_id(itemId)
                .then((result) => {
                    expect(result._id).to.equal(itemId);
                    done();
                }).catch((err) => {
                    console.error(err);
                    expect.fail(err.message);
                });
        });

    });

    describe("Find Items by category", () => {
        it("should return empty array",
            (done) => {
                let category = "test";
                mockItemCategory({
                    findOne: (query) => {
                        expect(query.category).to.equal(category);
                        return Promise.resolve(null);
                    }
                });
                let mockItemService = mock.reRequire('../../services/itemservice');
                mockItemService.find_items_by_category(category)
                    .then((result) => {
                        expect(result).to.empty;
                        done();
                    }).catch((err) => {
                        expect.fail(err.message);
                    });
            });
        it("should return an array of items",
            (done) => {
                let category = "test";
                let categoryId = "testId";
                let items = [
                    { _id: '1' }, { _id: '2' }
                ];
                mockItemCategory({
                    findOne: (query) => {
                        expect(query.category).to.equal(category);
                        return Promise.resolve({
                            _id: categoryId,
                            category,
                        });
                    }
                });

                mockItem({
                    find: (query) => {
                        expect(query.category).to.equal(categoryId);
                        return Promise.resolve(items);
                    }
                });

                let mockItemService = mock.reRequire('../../services/itemservice');
                mockItemService.find_items_by_category(category)
                    .then((result) => {
                        expect(result).to.deep.equal(items);
                        done();
                    }).catch((err) => {
                        expect.fail(err.message);
                    });
            });
    });

    describe("Create Item Category", () => {
        it('should create a new category', (done) => {
            itemService.create_category('test')
                .then((saved) => {
                    expect(saved).to.have.property('category', 'test');
                    itemcategory.findOne({ category: 'test' })
                        .then((result) => {
                            expect(result).to.have.property('category', 'test');
                            done();
                        }).catch((err) => {
                            throw err;
                        });
                }).catch((err) => {
                    done(err);
                });
        });
    });
}