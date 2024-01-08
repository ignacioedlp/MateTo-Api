const express = require('express');
const router = express.Router();

// Importar el controlador de colors
const ColorsController = require('../../controllers/color.controller');

// Importar el middleware de autorización
const AccessControl = require('../../middlewares/access.middleware');

// GET request para obtener la lista de todos los usuarios
router.get('/', AccessControl.authorizeRoles('ADMIN'), ColorsController.getAllColors);

// GET request para obtener un usuario específico por ID
router.get('/:id', AccessControl.authorizeRoles('ADMIN'), ColorsController.getColorById);

// PUT request para actualizar un usuario específico por ID
router.put('/:id', AccessControl.authorizeRoles('ADMIN'), ColorsController.updateColor);

// DELETE request para eliminar un usuario específico por ID
router.delete('/:id', AccessControl.authorizeRoles('ADMIN'), ColorsController.deleteColor);

// POST request para crear un nuevo usuario
router.post('/', ColorsController.createColor);

module.exports = router;