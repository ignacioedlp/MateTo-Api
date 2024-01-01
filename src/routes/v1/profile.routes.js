// API /profile
const express = require('express');
const router = express.Router();

// Importar el controlador de usuarios
const ProfileController = require('../../controllers/profile.controller');

router.get('/', ProfileController.getProfile);

router.put('/', ProfileController.updateProfile);

module.exports = router;

