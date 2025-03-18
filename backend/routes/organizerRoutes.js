
const express = require('express');
const router = express.Router();
const {
    getAllOrganizers,
    getOrganizerById,
    updateOrganizer,
    deleteOrganizer,
    createOrganizer 
    } = require('../controllers/organizerController')

router.get('/', getAllOrganizers).post(createOrganizer)
router.get('/:id', getOrganizerById).put(updateOrganizer).delete(deleteOrganizer);

module.exports = router;

