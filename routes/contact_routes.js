const controller = require('../controllers/contact_controller');

module.exports = (router) => {
  router.route('/contact/create')
    .post(controller.create)
  router.route('/contact/delete')
    .delete(controller.delete)
};
