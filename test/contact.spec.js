const result = require('dotenv').config()
if (result.error) {
  throw result.error
}
const should = require("should");
const request = require("request");
const chai = require("chai");
const { uuid } = require('uuidv4');
const beforeTest = require('../commons/tests/before_scripts')
const expect = chai.expect;
const urlBase = process.env.API_BASE;
const pcid = uuid();

describe("Patient Endpoints", function () {
  before("", async function () {
    await beforeTest.clean()
    await beforeTest.createPatient(pcid)
  })

  describe("POST#/contact/create", function () {

    it("When params are valids, Create Contact", function (done) {
      request.post({ url: urlBase + '/api/v1/contact/create', json: { contact_number: "TEST-333", patient_id: pcid } }, function (error, response, body) {
        expect(response.statusCode).to.equal(201);
        expect(body).to.have.property('data');
        done();
      });
    });

    it("When params are invalids, Bad Request ", function (done) {
      request.post({ url: urlBase + '/api/v1/contact/create', json: { contact_number: null,  patient_id: "invalid" } }, function (error, response, body) {
        expect(response.statusCode).to.equal(500);
        expect(body).to.have.property('error');
        done();
      });
    });
  })
})



