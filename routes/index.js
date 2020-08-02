const patient = require('./patient_routes')

module.exports = (router) => {
  patient(router)
  return router
}