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
          res.status(200).json(user || {})
        }).catch(() => {
          res.status(500).json(this.statusCode['500'])
        })
      } catch (err) {
        console.error(`[ERROR] user/show/:id -> ${err}`)
        res.status(400).json(this.statusCode['400'])
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
