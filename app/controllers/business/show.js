const BusinessModel = require('../../models/business')

class Show {
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
    this.app.get('/business/show/:id', (req, res) => {
      try {
        if (!req.params || !req.params.id.length) {
          res.status(404).json(this.statusCode['404'])
        }

        this.BusinessModel.findById(req.params.id).then(business => {
          if (!business) {
            res.status(200).json({})

            return
          }

          res.status(200).json(business)
        }).catch((err) => {
          res.status(500).json({
            code: 500,
            message: err
          })
        })
      } catch (err) {
        console.error(`[ERROR] business/show/:id -> ${err}`)
        res.status(500).json({
          code: 500,
          message: err
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

module.exports = Show
