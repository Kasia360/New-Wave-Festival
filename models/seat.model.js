const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: true
  },
  seat: {
    type: Number,
    required: true
  },
  client_id: {
    type: String,
    required: true,
    ref: 'Client'
  }
});

module.exports = mongoose.model('Seat', seatSchema);