const Application = require('../models/application');
const Pet = require('../models/Pet');

exports.createApplication = async (req, res) => {
  try {
    const application = new Application({ ...req.body, user: req.user.id });
    await application.save();
    res.status(201).json({ message: 'Application submitted successfully', application });
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit application' });
  }
};

exports.updateApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!application) return res.status(404).json({ message: 'Application not found' });
    res.json({ message: 'Application updated successfully', application });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update application' });
  }
};

exports.listApplications = async (req, res) => {
  try {
    const applications = await Application.find().populate('pet user');
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve applications' });
  }
};

exports.adoptPet = async (req, res) => {
  try {
    const { petId, userId } = req.body;

    // Check if the pet exists
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    // Check if the pet is already adopted
    if (pet.status === "adopted") {
      return res.status(400).json({ message: "This pet has already been adopted." });
    }

    // Update the pet's status to "adopted"
    pet.status = "adopted";
    await pet.save();

    // Create an adoption application record
    const application = new Application({
      pet: petId,
      user: userId,
      status: "approved",
      date: new Date(),
    });
    await application.save();

    res.json({ message: `Successfully adopted ${pet.name}`, application });
  } catch (err) {
    console.error("Error in adoptPet:", err);
    res.status(500).json({ message: "Failed to process adoption", error: err.message });
  }
};

