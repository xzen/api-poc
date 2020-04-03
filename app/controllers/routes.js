const Create = require('./users/create')
const Show = require('./users/show')

const CreateBusiness = require('./business/create')
const ShowBusiness = require('./business/show')

module.exports = {
  users: {
    Show,
    Create
  },
  business: {
    CreateBusiness,
    ShowBusiness
  }
}
