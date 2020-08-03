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
const { uuid } = require('uuidv4');
const pcid = uuid()

const validCreate = {
  last_name: "Postman",
  first_name: "OLL",
  birth_dt: "2020-5-20",
  blood_type: "AB-",
  cpf: "11122233344",
  contacts: ["(21)94444-5555", "(21)94444-8888"]
}
const invalidCreate = {
  last_name: null,
  first_name: "OLL",
  birth_dt: "2020-5-20",
  blood_type: "AB-",
  cpf: "11122233344",
  contacts: null
}

const validUpdate = {
  patient_id: pcid,
  last_name: "ALAL",
  first_name: "OLL",
  blood_type: "AB-",
}

const invalidUpdate = {
  patient_id: pcid,
  last_name: null,
  first_name: "OLL",
  blood_type: "AB-",
}

describe("Patient Endpoints", function () {
  before("", async function () {
    await beforeTest.clean()
  })

  describe("GET#/patient/getAll", function () {
    before("", async function () {
      await beforeTest.createPatientAndContact()
    })
    it("Return all Patients and Contacts", function (done) {
      request.get({ url: urlBase + '/api/v1/patient/getAll', json: { algo: 'ok' } }, function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        expect(body).to.have.property('data');
        expect(body.data).to.be.an('array');
        done();
      });
    });
  })

  describe("POST#/patient/create", function () {

    it("When params are valids, Create Patient", function (done) {
      request.post({ url: urlBase + '/api/v1/patient/create', json: validCreate }, function (error, response, body) {
        expect(response.statusCode).to.equal(201);
        expect(body).to.have.property('data');
        done();
      });
    });

    it("When params are invalids, Bad Request ", function (done) {
      request.post({ url: urlBase + '/api/v1/patient/create', json: invalidCreate }, function (error, response, body) {
        expect(response.statusCode).to.equal(400);
        expect(body).to.have.property('error');
        done();
      });
    });
  })

  describe("POST#/patient/update", function () {
    before("", async function () {
      await beforeTest.createPatient(pcid)
    })
    it("When params are valids, Update Patient", function (done) {
      request.post({ url: urlBase + '/api/v1/patient/update', json: validUpdate }, function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        expect(body).to.have.property('data');
        done();
      });
    });

    it("When params are invalids, Do nothing ", function (done) {
      request.post({ url: urlBase + '/api/v1/patient/update', json: invalidUpdate }, function (error, response, body) {
        expect(response.statusCode).to.equal(500);
        expect(body).to.have.property('error');
        done();
      });
    });
  })
})



