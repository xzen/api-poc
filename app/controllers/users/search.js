const UsersModel = require('../../models/user')

class Search {
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
    this.app.post('/users/search', (req, res) => {
      const pipe = [];

      if (req.body.user_id || req.body.business_id) {
        if (req.body.user_id) {
          pipe.push({$match: {user_id: req.body.user_id}})
        }

        if (req.body.business_id) {
          pipe.push({$match: {business_id: req.body.business_id}})
        }
      }

      pipe.push({ $limit: req.body.limit || 10})

      try {
        this.UsersModel.aggregate(pipe).then(user => {
          if (!user) {
            res.status(200).json({})

            return
          }

          res.status(200).json(user)
        }).catch((err) => {
          console.log(err)
          res.status(500).json({
            code: 500,
            message: err
          })
        })
      } catch (err) {
        console.log(err)
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

module.exports = Search
