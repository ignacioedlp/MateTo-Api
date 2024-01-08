const express = require('express');
const router = express.Router();

// Importar el controlador de usuarios
const ProductTypesController = require('../../controllers/productType.controller');

// Importar el middleware de autorización
const AccessControl = require('../../middlewares/access.middleware');

// GET request para obtener la lista de todos los usuarios
router.get('/', AccessControl.authorizeRoles('ADMIN'), ProductTypesController.getAllProductTypes);

// GET request para obtener un usuario específico por ID
router.get('/:id', AccessControl.authorizeRoles('ADMIN'), ProductTypesController.getProductTypeById);

// PUT request para actualizar un usuario específico por ID
router.put('/:id', AccessControl.authorizeRoles('ADMIN'), ProductTypesController.updateProductType);

// DELETE request para eliminar un usuario específico por ID
router.delete('/:id', AccessControl.authorizeRoles('ADMIN'), ProductTypesController.deleteProductType);

// POST request para crear un nuevo usuario
router.post('/', ProductTypesController.createProductType);

module.exports = router;