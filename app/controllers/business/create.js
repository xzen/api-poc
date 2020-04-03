const BusinessModel = require('../../models/business')

class Business {
  /**
   * @constructor
   * @param {Object} app
   * @param {Object} connect
   * @param {Object} config
   */
  constructor (app, connect) {
    this.app = app
    this.BusinessModel = connect.model('Business', BusinessModel)

    this.run()
  }

  /**
   * Middleware
   */
  middleware () {
    this.app.post('/business/create', (req, res) => {
      try {
        const businessModel = new this.BusinessModel(req.body)

        businessModel.save().then(business => {
          res.status(200).json(business || {})
        }).catch(err => {
          res.status(500).json({
            code: 500,
            message: err
          })
        })
      } catch (err) {
        console.error(`[ERROR] business/create/:id -> ${err}`)
        res.status(500).json({
          code: 500,
          message: 'Internal Server Error'
        })
      }
    })
  }

  /**
   * Run
   */
  run () {
    this.middleware()
  }
}

module.exports = Business
