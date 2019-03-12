var expect  = require('chai').expect;
var request = require('request');

const server = 'http://localhost:5000'

describe("Items Api Test", function () {
    const itemsEndpoint = server+'/items';
    it('Test get item by id', function (done) {
        request(itemsEndpoint+'/id/:1' , function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            expect(body).to.equal('Get Item');
            done();
        });
    });

    it('Test get items by category', function (done) {
        request(itemsEndpoint+"/category", function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            expect(body).to.equal('Get Items By Category');
            done();
        });
    });

    it("Test post item", function (done) {
        request(itemsEndpoint, { method: "POST" }, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            expect(body).to.equal('Create Item');
            done();
        });
    });

});