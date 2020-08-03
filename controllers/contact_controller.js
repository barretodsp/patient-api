const db = require('../database/db');
const { uuid } = require('uuidv4');


async function addContact(dbconnection, patient_id, contact_number ) {
  const queryAdd = {
    text: "INSERT INTO contacts (contact_id, patient_id, contact_number, created_dt) VALUES ($1, $2, $3, CURRENT_TIMESTAMP )",
    rowMode: "array"
  };
  let id = uuid();
  return await dbconnection.query(queryAdd, [id, patient_id, contact_number]);
}


module.exports = {
  addContact

}