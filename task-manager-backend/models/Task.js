const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
  title: { type: String, required: true,},
  status: { type: String, enum: ['Active', 'Completed'], default: 'Active' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Task', taskSchema);