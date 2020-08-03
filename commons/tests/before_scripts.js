const result = require('dotenv').config()
if (result.error) {
  throw result.error
}
console.log(result.parsed);

const db = require('../../database/db');

async function clean() {

  let cli = await db.connect();
  const query = {
    text: "DELETE FROM patients",
    rowMode: "array"
  };
  await cli.query(query);
  return;
}


async function createPatientAndContact() {
  const query = {
    text: "INSERT INTO patients (patient_id, first_name, last_name, birth_dt, cpf, blood_type, created_dt) VALUES (uuid_generate_v1(), $1, $2, $3, $4, $5, CURRENT_TIMESTAMP) RETURNING patient_id",
    rowMode: "array"
  };

  const query_ct = {
    text: "insert into contacts (contact_id, patient_id, contact_number, created_dt) values (uuid_generate_v1(), $1, $2, CURRENT_TIMESTAMP);",
    rowMode: "array"
  };

  try {
    let client = await db.connect();
    client.query("BEGIN");
    let resp = await client.query(query, ['Fname1', 'Lname1', '2020-01-01', '11122233344', 'AB+'])
    console.log('O RESP', resp.rows[0][0]);
    await client.query(query_ct, [resp.rows[0][0], '(21)97777-5555'])
    client.query('COMMIT');
    return;
  } catch (er) {
    client.query('ROLLBACK');
    return;
  }


}


module.exports = {
  createPatientAndContact,
  clean
}