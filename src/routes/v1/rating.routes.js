const express = require('express');
const router = express.Router();


// Importar el controlador de usuarios
const RatingController = require('../../controllers/rating.controller');

// Importar el middleware de autorización
const AccessControl = require('../../middlewares/access.middleware');

// Create Rating
router.post('/', AccessControl.authorizeRoles('USER'), RatingController.createRating);

// Update Rating
router.put('/:id', AccessControl.authorizeRoles('USER'), RatingController.updateRating);

module.exports = router;