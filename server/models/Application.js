// models/Application.js
const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  jobName: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  applyDate: {
    type: Date,
    default: Date.now
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true // This adds createdAt and updatedAt fields
});

module.exports = mongoose.models.Application || mongoose.model('Application', applicationSchema);