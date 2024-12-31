const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  temperament: { type: String },
  specialNeeds: { type: String },
  isAdopted: { type: Boolean, default: false },
  photo: { type: String }, // URL to the pet's photo
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
