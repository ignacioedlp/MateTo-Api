import { Router } from 'express';
import ProductsController from '../../controllers/product.controller';
import AccessControl from '../../middlewares/access.middleware';
const router = Router();


// Get All products
router.get('/', ProductsController.getAllProducts);

// Get one product by ID
router.get('/:id', ProductsController.getProductById);

// Create a new product
router.post('/', AccessControl.authorizeRoles('ADMIN', 'VENDOR'), ProductsController.createProduct);

// Update a product by ID
router.put('/:id', AccessControl.authorizeRoles('ADMIN', 'VENDOR'), AccessControl.checkIfIsTheSameVendorOrAdminProduct(), ProductsController.updateProduct);

// Delete a product by ID
router.delete('/:id', AccessControl.authorizeRoles('ADMIN', 'VENDOR'), AccessControl.checkIfIsTheSameVendorOrAdminProduct(), ProductsController.deleteProduct);

export default router;