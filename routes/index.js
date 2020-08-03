const patient = require('./patient_routes')
const contact = require('./contact_routes')

module.exports = (router) => {
  patient(router)
  contact(router)
  return router
}