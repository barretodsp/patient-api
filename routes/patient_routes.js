const controller = require('../controllers/patient_controller');

module.exports = (router) => {
  router.route('/patient/getAll')
    .get(controller.getAll)
};
