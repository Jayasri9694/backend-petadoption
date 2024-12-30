const Application = require('../models/application');


exports.createApplication = async (req, res) => {
  console.log('Request body:', req.body);

  const { userId, petId, message } = req.body;

  if (!userId || !petId || !message) {
    console.error('Missing fields:', { userId, petId, message });
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const application = new Application({
      user: userId,
      pet: petId,
      message,
    });

    console.log('Saving application:', application);

    await application.save();

    res.status(201).json({
      message: 'Application created successfully!',
      application,
    });
  } catch (error) {
    console.error('Error submitting application:', error);
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

