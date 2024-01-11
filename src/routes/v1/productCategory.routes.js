import { Router } from 'express';
const router = Router();

// Importar el controlador de usuarios
import ProductCategoriesController from '../../controllers/productCategory.controller';

// Importar el middleware de autorización
import AccessControl from '../../middlewares/access.middleware';


// GET request para obtener la lista de todos los usuarios
router.get('/', AccessControl.authorizeRoles('ADMIN'), ProductCategoriesController.getAllProductCategories);

// GET request para obtener un usuario específico por ID
router.get('/:id', AccessControl.authorizeRoles('ADMIN'), ProductCategoriesController.getProductCategoryById);

// PUT request para actualizar un usuario específico por ID
router.put('/:id', AccessControl.authorizeRoles('ADMIN'), ProductCategoriesController.updateProductCategory);

// DELETE request para eliminar un usuario específico por ID
router.delete('/:id', AccessControl.authorizeRoles('ADMIN'), ProductCategoriesController.deleteProductCategory);

// POST request para crear un nuevo usuario
router.post('/', ProductCategoriesController.createProductCategory);

export default router;