const UsersModel = require('../../models/users-merged')

class Create {
  /**
   * @constructor
   * @param {Object} app
   * @param {Object} connect
   * @param {Object} config
   */
  constructor (app, connect) {
    this.app = app
    this.UsersModel = connect.model('User', UsersModel)

    this.run()
  }

  /**
   * Middleware
   */
  middleware () {
    this.app.post('/users/create', (req, res) => {
      try {
        const userModel = new this.UsersModel(req.body)

        userModel.save().then(user => {
          res.status(200).json(user || {})
        }).catch(err => {
          res.status(500).json({
            code: 500,
            message: err
          })
        })
      } catch (err) {
        console.error(`[ERROR] user/create/:id -> ${err}`)
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

module.exports = Create
