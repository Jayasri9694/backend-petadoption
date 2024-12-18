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

