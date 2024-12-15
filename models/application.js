const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, default: 'Pending' }, // Pending, Approved, Rejected
  scheduledMeetDate: { type: Date },
  feedback: { type: String },
});

module.exports = mongoose.model('Application', applicationSchema);
