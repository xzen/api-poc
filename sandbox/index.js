const mongoose = require('mongoose')

const UserModel = require('../app/models/user')
const ReviewModel = require('../app/models/review')
const UserMergedModel = require('../app/models/users-merged')

class IndexUser {
  dbConnect () {
    const host = 'mongodb://localhost:27017/oursin'
    const connect = mongoose.createConnection(host)

    connect.on('error', (err) => {
      setTimeout(() => {
        console.log('[ERROR] api dbConnect() -> mongodb error')
        this.connect = this.dbConnect(host)
      }, 5000)

      console.error(`[ERROR] api dbConnect() -> ${err}`)
    })

    connect.on('disconnected', () => {
      setTimeout(() => {
        console.log('[DISCONNECTED] api dbConnect() -> mongodb disconnected')
        this.connect = this.dbConnect(host)
      }, 5000) 
    })

    process.on('SIGINT', () => {
      connect.close(() => {
        console.log('[API END PROCESS] api dbConnect() -> close mongodb connection ')
        process.exit(0)
      })
    })

    return connect
  }

  mergedData(id) {
    this.ReviewModel
      .find({_id: {$gt: id}})
      .limit(1)
      .then(review => {
        const newReview = JSON.parse(JSON.stringify(review))[0]
        const reviewId = newReview.id

        if (!review) {
          return
        }

        this.searchUserById(newReview.user_id, user => {
          const newUser = JSON.parse(JSON.stringify(user))[0]

          delete newUser.id
          delete newReview.id
          delete newReview.user_id

          newUser.review = newReview

          this.saveUserUpdated(newUser)
        })

        this.mergedData(reviewId)
      })
  }

  searchUserById(id, callback) {
    this.UserModel.find({user_id: id}).then(user => {
      callback(user)
    })
  }

  saveUserUpdated(userUpdated) {
    const userModel = new this.UserMergedModel(userUpdated)

    userModel.save()  
  }

  run() {
    this.connect = this.dbConnect()
    this.UserModel = this.connect.model('User', UserModel)
    this.ReviewModel = this.connect.model('Review', ReviewModel)
    this.UserMergedModel = this.connect.model('UserMerged', UserMergedModel)

  	this.mergedData('5e4ea9089c37ca0a6cef8229')
  }
}

const indexUser = new IndexUser()

indexUser.run()