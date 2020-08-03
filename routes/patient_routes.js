const controller = require('../controllers/patient_controller');

module.exports = (router) => {
  router.route('/patient/getAll')
    .get(controller.getAll)
  router.route('/patient/create')
    .post(controller.create)
  router.route('/patient/update')
    .post(controller.update)
};
