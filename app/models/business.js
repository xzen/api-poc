const mongoose = require('mongoose')
const Review = require('./review')

const Schema = new mongoose.Schema({
  business_id: String,
  name: String,
  adress: String,
  state: String,
  postal_code: String,
  latitude: Number,
  longitude: Number,
  stars: Number,
  review_count: Number,
  is_open: Number,
  attributes: {
    restaurants_take_out: Boolean,
    business_parking: {
      garage: Boolean,
      street: Boolean,
      validated: Boolean,
      lot: Boolean,
      valet: Boolean
    }
  },
  categories: {
    type: Array,
    default: []
  },
  hours: {
    Monday: Date,
    Tuesday: Date,
    Friday: Date,
    Wednesday: Date,
    Thursday: Date,
    Sunday: Date,
    Saturday: Date
  },
  reviews: [Review]
}, {
  collection: 'business',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id

    delete ret._id
  }
})

module.exports = Schema
