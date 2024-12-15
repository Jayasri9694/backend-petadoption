const express = require('express');
const { createApplication, updateApplication, listApplications,adoptPet } = require('../controllers/applicationController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createApplication);
router.put('/:id', authMiddleware, updateApplication);
router.get('/', authMiddleware, listApplications);   
router.post('/adopt', authMiddleware, adoptPet);
module.exports = router;
