
const mongoose = require('mongoose');

const clickSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
  action: {
    type: String,
    required: true,
    default: 'button_clicked'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Click', clickSchema);
