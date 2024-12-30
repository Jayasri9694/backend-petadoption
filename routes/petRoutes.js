const express = require('express');
const { addPet, updatePet, listPets,adoptPet} = require('../controllers/petController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();


router.post('/',authMiddleware, addPet);
router.put('/:id',authMiddleware, updatePet);
router.get('/',authMiddleware, listPets);
router.post('/adopt', authMiddleware, adoptPet);

module.exports = router;
