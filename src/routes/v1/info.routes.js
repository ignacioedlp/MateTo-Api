// API /profile
const express = require('express');
const router = express.Router();

// Importar el controlador de informacion de MateTo
const InfoController = require('../../controllers/info.controller');

router.get('/', InfoController.getSettings);

module.exports = router;

