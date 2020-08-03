const { attributes } = require('structure');

const Patient = attributes({
  patient_id: {
    type: String,
    guid: {
      version: ['uuidv4']
    },
    required: true
  },
  cpf: {
    type: String,
    required: true,
    trim: true
  },
  blood_type: {
    type: String,
    required: true,
    trim: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true,
  },
  birth_dt: {
    type: Date,
    required: true
  },
})(class Patient { });

module.exports = Patient;
