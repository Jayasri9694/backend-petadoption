const express = require('express');
const { addPet, updatePet, listPets } = require('../controllers/petController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, addPet);
router.put('/:id', authMiddleware, updatePet);
router.get('/', listPets);

module.exports = router;
