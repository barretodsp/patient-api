const db = require('../database/db');
const Patient = require('../models/patient');
const ContactController = require('./contact_controller');
const { uuid } = require('uuidv4');


async function addPatient(dbconnection, id, first_name, last_name, cpf, birth_dt, blood_type) {
  const queryAdd = {
    text: "INSERT INTO patients (patient_id, first_name, last_name, cpf, birth_dt, blood_type, created_dt) VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)",
    rowMode: "array"
  };
  return await dbconnection.query(queryAdd, [id, first_name, last_name, cpf, birth_dt, blood_type]);
}

async function updatePatient(dbconnection, id, first_name, last_name, blood_type) {
  const queryAdd = {
    text: "UPDATE patients SET first_name = $1, last_name = $2, blood_type = $3 WHERE patient_id = $4",
    rowMode: "array"
  };
  return await dbconnection.query(queryAdd, [first_name, last_name, blood_type, id]);
}



module.exports = {
  getAll: async (req, res) => {
    const query = {
      text: "select array_to_json(array_agg(row_to_json(t))) from (SELECT pc.patient_id, pc.first_name, pc.last_name, pc.birth_dt, pc.blood_type, pc.cpf, array_to_json(array_agg(array[cast(ct.contact_id AS varchar), ct.contact_number])) as contacts FROM patients pc INNER JOIN contacts ct ON ct.patient_id = pc.patient_id GROUP BY pc.patient_id ) t;",
      rowMode: "array"
    };
    const client = await db.connect();
    console.log("patient-get");
    try {
      let resp = await client.query(query);
      res.status(200).json({
        data: resp.rows[0][0] || []
      });
    } catch (er) {
      console.log('ERRO getPatients =>', er)
      res.status(500).json({
        error: "Erro interno.",
      });
    } finally {
      client.release();
    }
  },
  create: async (req, res) => {
    const client = await db.connect();
    try {
      let pcid = uuid();
      let patient = new Patient({
        patient_id: pcid,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birth_dt: req.body.birth_dt,
        blood_type: req.body.blood_type,
        cpf: req.body.cpf
      })
      let contacts = req.body.contacts;
      if (patient.validate() && contacts && Array.isArray(contacts)) {
        client.query("BEGIN");
        await addPatient(client, patient.patient_id, patient.first_name, patient.last_name, patient.cpf, patient.birth_dt, patient.blood_type);
        for(var i = 0; i < contacts.length ; i++){
          await ContactController.addContact(client, pcid, contacts[i])
        }
        client.query('COMMIT');
        res.status(201).json({
          data: 'success'
        });
      } else {
        res.status(400).json({
          error: 'Parâmetros inválidos.'
        });
      }
    } catch (er) {
      console.log('ERRO 111', er);
      client.query('ROLLBACK');
      res.status(500).json({
        error: "Erro interno.",
      });
    } finally {
      client.release();
    }

  },
  update: async (req, res) => {
    const client = await db.connect();
    try {
      await updatePatient(client, req.body.patient_id, req.body.first_name, req.body.last_name, req.body.blood_type);
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