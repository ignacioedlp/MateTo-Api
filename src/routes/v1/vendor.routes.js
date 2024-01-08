const express = require('express');
const router = express.Router();

// Importar el controlador de usuarios
const VendorsController = require('../../controllers/vendor.controller');

// GET request para obtener la lista de todos los usuarios
router.get('/', VendorsController.getAllVendors);

// GET request para obtener un usuario específico por ID
router.get('/:id', VendorsController.getVendorById);

module.exports = router;