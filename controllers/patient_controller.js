const db = require('../database/db');

module.exports = {
  getAll: async (req, res) => {
    const query = {
      text: "select array_to_json(array_agg(row_to_json(t))) from (SELECT pc.patient_id, pc.first_name, pc.last_name, pc.birth_dt, pc.blood_type, pc.cpf, array_to_json(array_agg(array[cast(ct.contact_id AS varchar), ct.contact_number])) as contacts FROM patients pc INNER JOIN contacts ct ON ct.patient_id = pc.patient_id GROUP BY pc.patient_id ) t;",
      rowMode: "array"
    };
    console.log("patient-get");
    const cli = await db.connect();
    try {
      let resp = await cli.query(query);
      console.log('RESP >', resp.rows[0][0])
      res.status(200).json({
        data: resp.rows[0][0]
      });
    } catch (er) {
      console.log('ERRO getPatients =>', er)
      res.status(500).json({
        error: "Erro interno.",
      });
    } finally {
      cli.release();
    }
  }
}