const express = require('express');
const router = express.Router();

// Importar el controlador de usuarios
const RolesController = require('../../controllers/role.controller');

// Importar el middleware de autorización
const AccessControl = require('../../middlewares/access.middleware');

// GET request para obtener la lista de todos los usuarios
router.get('/', AccessControl.authorizeRoles('ADMIN'), RolesController.getAllRoles);

// GET request para obtener un usuario específico por ID
router.get('/:id', AccessControl.authorizeRoles('ADMIN'), RolesController.getRoleById);

// PUT request para actualizar un usuario específico por ID
router.put('/:id', AccessControl.authorizeRoles('ADMIN'), RolesController.updateRole);

// DELETE request para eliminar un usuario específico por ID
router.delete('/:id', AccessControl.authorizeRoles('ADMIN'), RolesController.deleteRole);

// POST request para crear un nuevo usuario
router.post('/', RolesController.createRole);

module.exports = router;