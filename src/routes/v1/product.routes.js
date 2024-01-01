const express = require('express');
const router = express.Router();


// Importar el controlador de usuarios
const ProductsController = require('../../controllers/product.controller');

// Importar el middleware de autorización
const AccessControl = require('../../middlewares/access.middleware');


// Get All products
router.get('/', ProductsController.getAllProducts);

// Get All products for one user
router.get('/vendor/:id', ProductsController.getAllProductsForVendor);

// Get one product by ID
router.get('/:id', ProductsController.getProductById);

// Create a new product
router.post('/', AccessControl.authorizeRoles('ADMIN', 'VENDOR'), ProductsController.createProduct);

// Update a product by ID
router.put('/:id', AccessControl.authorizeRoles('ADMIN', 'VENDOR'), AccessControl.checkIfIsTheSameVendorOrAdminProduct(), ProductsController.updateProduct);

// Delete a product by ID
router.delete('/:id', AccessControl.authorizeRoles('ADMIN', 'VENDOR'), AccessControl.checkIfIsTheSameVendorOrAdminProduct(), ProductsController.deleteProduct);

module.exports = router;