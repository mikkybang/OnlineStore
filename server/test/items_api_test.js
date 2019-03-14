const mongoose = require('mongoose');
const Item = require('../models/item');
const ItemCategory = require('../models/itemcategory');

const chai  = require('chai');
const chaiHttp = require('chai-http');

const server = require('../app');

const should = chai.should;

chai.use(chaiHttp);

describe('Items', () => {
    beforeEach((done) => {
        Item.remove({})
        .then(() => {
            ItemCategory.remove({})
            .then(() => {
                done();
            });
        });
    });
});