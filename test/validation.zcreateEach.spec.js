'use strict';
var expect = require('chai').expect;
var faker = require('faker');
var email = faker.internet.email();
var username = faker.internet.userName();

describe('Hook#validation#createEach database errors', function() {

    before(function(done) {
        User
            .create({
                email: email,
                username: username,
                birthday: faker.date.past()
            })
            .exec(done);
    });

    it('should throw unique error message using node callback style', function(done) {

        User
            .createEach([{
                email: faker.internet.email(),
                username: faker.internet.userName(),
                birthday: faker.date.past()
            }, {
                email: email,
                username: username,
                birthday: faker.date.past()
            }], function(error, users) {
                expect(error.Errors.email).to.exist;

                expect(error.Errors.email[0].message)
                    .to.equal(User.validationMessages.email.unique);

                done(null, users);
            });
    });

    it('should throw unique error message using deferred style', function(done) {

        User
            .createEach([{
                email: faker.internet.email(),
                username: faker.internet.userName(),
                birthday: faker.date.past()
            }, {
                email: email,
                username: username,
                birthday: faker.date.past()
            }])
            .exec(function(error, users) {
                expect(error.Errors.email).to.exist;

                expect(error.Errors.email[0].message)
                    .to.equal(User.validationMessages.email.unique);

                done(null, users);
            });
    });

    it('should throw unique error message using promise style', function(done) {

        User
            .createEach([{
                email: faker.internet.email(),
                username: faker.internet.userName(),
                birthday: faker.date.past()
            }, {
                email: email,
                username: username,
                birthday: faker.date.past()
            }])
            .catch(function(error) {
                expect(error.Errors.email).to.exist;

                expect(error.Errors.email[0].message)
                    .to.equal(User.validationMessages.email.unique);

                done();
            });
    });

});