const Create = require('./users/create')
const Show = require('./users/show')
const Search = require('./users/search')

const CreateBusiness = require('./business/create')
const ShowBusiness = require('./business/show')

module.exports = {
  users: {
    Show,
    Create,
    Search
  },
  business: {
    CreateBusiness,
    ShowBusiness
  }
}
