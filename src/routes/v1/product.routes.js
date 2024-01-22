import { Router } from 'express';
import ProductsController from '../../controllers/product.controller';
import AccessControl from '../../middlewares/access.middleware';

const router = Router();

/**
 * Route for getting all products.
 * @name GET /v1/products
 * @function
 * @memberof module:routes/v1/product.routes
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
router.get('/', ProductsController.getAllProducts);

/**
 * Route for getting a product by its ID.
 * @name GET /v1/products/:id
 * @function
 * @memberof module:routes/v1/product.routes
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
router.get('/:id', ProductsController.getProductById);

/**
 * Route for creating a new product.
 * @name POST /v1/products
 * @function
 * @memberof module:routes/v1/product.routes
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
router.post('/', AccessControl.authorizeRoles('ADMIN', 'VENDOR'), ProductsController.createProduct);

/**
 * Route for updating a product by its ID.
 * @name PUT /v1/products/:id
 * @function
 * @memberof module:routes/v1/product.routes
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
router.put('/:id', AccessControl.authorizeRoles('ADMIN', 'VENDOR'), AccessControl.checkIfIsTheSameVendorOrAdminProduct(), ProductsController.updateProduct);

/**
 * Route for deleting a product by its ID.
 * @name DELETE /v1/products/:id
 * @function
 * @memberof module:routes/v1/product.routes
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
router.delete('/:id', AccessControl.authorizeRoles('ADMIN', 'VENDOR'), AccessControl.checkIfIsTheSameVendorOrAdminProduct(), ProductsController.deleteProduct);

export default router;
