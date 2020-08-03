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

async function createPatient(patient_id) {
  const query = {
    text: "INSERT INTO patients (patient_id, first_name, last_name, birth_dt, cpf, blood_type, created_dt) VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP) RETURNING patient_id",
    rowMode: "array"
  };
  const client = await db.connect();
  try {
    client.query("BEGIN");
    await client.query(query, [patient_id, 'Fname2', 'Lname2', '2020-01-01', '77722233344', 'A+'])
    client.query('COMMIT');
    return;
  } catch (er) {
    console.log( 'EERRRO >>> ', er)
    client.query('ROLLBACK');
    return;
  } finally{
    client.release()
  }
}

async function createContact(patient_id, contact_id) {
  const query_ct = {
    text: "insert into contacts (contact_id, patient_id, contact_number, created_dt) values ($1, $2, $3, CURRENT_TIMESTAMP);",
    rowMode: "array"
  };
  const client = await db.connect();
  try {
    client.query("BEGIN");
    await client.query(query_ct, [contact_id, patient_id, '(21)91111-5555'])
    client.query('COMMIT');
    return;
  } catch (er) {
    console.log( 'EERRRO >>> ', er)
    client.query('ROLLBACK');
    return;
  } finally{
    client.release()
  }
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

  const client = await db.connect();
  try {
    client.query("BEGIN");
    let resp = await client.query(query, ['Fname1', 'Lname1', '2020-01-01', '11122233344', 'AB+'])
    await client.query(query_ct, [resp.rows[0][0], '(21)97777-5555'])
    client.query('COMMIT');
    return;
  } catch (er) {
    client.query('ROLLBACK');
    return;
  } finally{
    client.release()
  }


}


module.exports = {
  createPatientAndContact,
  clean,
  createPatient,
  createContact
}