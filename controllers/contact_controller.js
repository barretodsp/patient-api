const db = require('../database/db');
const { uuid } = require('uuidv4');


async function addContact(dbconnection, patient_id, contact_number) {
  const queryAdd = {
    text: "INSERT INTO contacts (contact_id, patient_id, contact_number, created_dt) VALUES ($1, $2, $3, CURRENT_TIMESTAMP )",
    rowMode: "array"
  };
  const id = uuid();
  return await dbconnection.query(queryAdd, [id, patient_id, contact_number]);
}

async function deleteContact(dbconnection, id) {
  const queryDel = {
    text: "DELETE FROM contacts WHERE contact_id = $1",
    rowMode: "array"
  };
  return await dbconnection.query(queryDel, [id]);
}


module.exports = {
  addContact,
  create: async (req, res) => {
    const client = await db.connect();
    try {
      let patient_id = req.body.patient_id;
      let contact_number = req.body.contact_number;
      client.query("BEGIN");
      await addContact(client, patient_id, contact_number)
      client.query('COMMIT');
      res.status(201).json({
        data: 'success'
      });
    } catch (er) {
      console.log('ERRO 555 ', er);
      client.query('ROLLBACK');
      res.status(500).json({
        error: "Erro interno.",
      });
    } finally {
      client.release();
    }
  },
  delete: async (req, res) => {
    const client = await db.connect();
    try {
      await deleteContact(client, req.body.contact_id);
      res.status(200).json({
        data: 'success'
      });
    } catch (er) {
      console.log('ERRO 555 ', er);
      res.status(500).json({
        error: "Erro interno.",
      });
    } finally {
      client.release();
    }
  }
}