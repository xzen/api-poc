const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  funny: Number,
  cool: Number,
  scores_negatifs_sentence: Array,
  scores_positifs_sentence: Array,
  useful: Number,
  review_id: String,
  text: String,
  business_id: String,
  scores_negatifs: Number,
  scores_positifs: Number,
  stars: Number,
  date: Date,
  user_id: String
}, {
  collection: 'users',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id

    delete ret._id
  }
})

module.exports = Schema
