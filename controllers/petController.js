const Pet = require('../models/Pet');

exports.addPet = async (req, res) => {
  try {
    const pet = new Pet({ ...req.body, owner: req.user.id });
    await pet.save();
    res.status(201).json({ message: 'Pet added successfully', pet });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add pet' });
  }
};

exports.updatePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pet) return res.status(404).json({ message: 'Pet not found' });
    res.json({ message: 'Pet updated successfully', pet });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update pet' });
  }
};

exports.listPets = async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve pets' });
  }
};
