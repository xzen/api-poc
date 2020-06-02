const UsersModel = require('../../models/users-merged')

class Show {
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
    this.app.get('/users/show/:id', (req, res) => {
      try {
        if (!req.params || !req.params.id.length) {
          res.status(404).json(this.statusCode['404'])
        }

        this.UsersModel.findById(req.params.id).then(user => {
          if (!user) {
            res.status(200).json({})

            return
          }

          res.status(200).json(user)
        }).catch((err) => {
          res.status(500).json({
            code: 500,
            message: err
          })
        })
      } catch (err) {
        console.error(`[ERROR] user/show/:id -> ${err}`)
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
