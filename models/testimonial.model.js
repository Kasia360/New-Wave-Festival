const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  author_id: {
    type: String,
    required: true,
    ref: 'Client'
  },
  text: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Testimonial', testimonialSchema);