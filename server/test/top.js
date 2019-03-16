const mongoose = require('mongoose');
const server = require('../app');

const User = require('../models/user');
const Item = require('../models/item');
const ItemCategory = require('../models/itemcategory');

function importTest (name, path) {
    describe(name, () => {
        require(path)(server);
    });
}

describe("", () => {
    before((done) => {
        mongoose.connection.once('open', done);
    });

    beforeEach((done) => {
        // wipe entire database
        Promise.all([User.deleteMany({}), Item.deleteMany({}),
        ItemCategory.deleteMany({})])
        .then(() => {
            done();
        })
        .catch((err) => {
            console.error(err);
        });
    });

    importTest('Test Items API', './api/items');
    importTest('Test ItemService', './services/itemservice');
    importTest('Test UserService', './services/userservice');
    importTest('Test AuthService', './services/authservice');
});