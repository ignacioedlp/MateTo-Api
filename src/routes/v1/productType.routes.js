import { Router } from 'express';
const router = Router();

// Importar el controlador de usuarios
import ProductTypesController from '../../controllers/productType.controller';

// Importar el middleware de autorización
import AccessControl from '../../middlewares/access.middleware';


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

export default router;