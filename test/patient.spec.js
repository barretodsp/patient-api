const result = require('dotenv').config()
if (result.error) {
  throw result.error
}
const should = require("should");
const request = require("request");
const chai = require("chai");
const beforeTest = require('../commons/tests/before_scripts')
const expect = chai.expect;
const urlBase = process.env.API_BASE;

describe("Patient Endpoints", function () {
  before("", async function () {
    await beforeTest.clean()
    await beforeTest.createPatientAndContact()
  })

  describe("GET#/patient/getAll", function () {
    it("Return all Patients and Contacts", function (done) {
      request.get({ url: urlBase + '/api/v1/patient/getAll', json: {algo: 'ok'} }, function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        expect(body).to.have.property('data');
        expect(body.data).to.be.an('array');
        done();
      });
    });
  })
})



