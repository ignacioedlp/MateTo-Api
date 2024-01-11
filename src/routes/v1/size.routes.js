import { Router } from 'express';
const router = Router();

// Importar el controlador de usuarios
import SizesController from '../../controllers/size.controller';

// Importar el middleware de autorización
import AccessControl from '../../middlewares/access.middleware';


// GET request para obtener la lista de todos los usuarios
router.get('/', AccessControl.authorizeRoles('ADMIN'), SizesController.getAllSizes);

// GET request para obtener un usuario específico por ID
router.get('/:id', AccessControl.authorizeRoles('ADMIN'), SizesController.getSizeById);

// PUT request para actualizar un usuario específico por ID
router.put('/:id', AccessControl.authorizeRoles('ADMIN'), SizesController.updateSize);

// DELETE request para eliminar un usuario específico por ID
router.delete('/:id', AccessControl.authorizeRoles('ADMIN'), SizesController.deleteSize);

// POST request para crear un nuevo usuario
router.post('/', SizesController.createSize);

export default router;