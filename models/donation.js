const mongoose = require('mongoose');

// Define the schema for the Donation model
const donationSchema = new mongoose.Schema({
  donorName: {
    type: String,
    required: true
  },
  donationType: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  distributedQuantity: {
    type: Number,
    default: 0
  }
});

// Create a model using the schema
const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
