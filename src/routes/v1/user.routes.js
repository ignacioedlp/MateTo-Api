import { Router } from 'express';
const router = Router();

// Importar el controlador de usuarios
import UsersController from '../../controllers/user.controller';

// Importar el middleware de autorización
import AccessControl from '../../middlewares/access.middleware';


// GET request para obtener la lista de todos los usuarios
router.get('/', AccessControl.authorizeRoles('ADMIN'), UsersController.getAllUsers);

// GET request para obtener un usuario específico por ID
router.get('/:id', AccessControl.authorizeRoles('ADMIN'), UsersController.getUserById);

// PUT request para actualizar un usuario específico por ID
router.put('/:id', AccessControl.authorizeRoles('ADMIN'), UsersController.updateUser);

// DELETE request para eliminar un usuario específico por ID
router.delete('/:id', AccessControl.authorizeRoles('ADMIN'), UsersController.deleteUser);

// POST request para crear un nuevo usuario
// router.post('/', UsersController.createUser);

export default router;