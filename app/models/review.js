const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  user_id: String,
  business_id: String,
  stars: {
    type: Number,
    default: 0
  },
  date: Date,
  text: String,
  useful: {
    type: Number,
    default: 0
  },
  funny: {
    type: Number,
    default: 0
  },
  cool: {
    type: Number,
    default: 0
  }
}, {
  collection: 'reviews',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id

    delete ret._id
  }
})

module.exports = Schema
