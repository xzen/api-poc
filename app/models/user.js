const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  user_id: String,
  name: String,
  review_count: {
    type: Number,
    default: 0
  },
  yelping_since: Date,
  friends: Array,
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
  },
  fans: {
    type: Number,
    default: 0
  },
  elite: Array,
  average_stars: Number,
  compliment_hot: {
    type: Number,
    default: 0
  },
  compliment_more: {
    type: Number,
    default: 0
  },
  compliment_profile: {
    type: Number,
    default: 0
  },
  compliment_cute: {
    type: Number,
    default: 0
  },
  compliment_list: {
    type: Number,
    default: 0
  },
  compliment_note: {
    type: Number,
    default: 0
  },
  compliment_plain: {
    type: Number,
    default: 0
  },
  compliment_cool: {
    type: Number,
    default: 0
  },
  compliment_funny: {
    type: Number,
    default: 0
  },
  compliment_writer: {
    type: Number,
    default: 0
  },
  compliment_photos: {
    type: Number,
    default: 0
  },
  score_positif: {
    type: Number,
    default: 0
  },
  score_negatif: {
    type: Number,
    default: 0
  }
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
