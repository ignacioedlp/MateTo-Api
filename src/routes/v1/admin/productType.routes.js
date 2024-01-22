import { Router } from 'express';
import ProductTypesController from '../../../controllers/admin/productType.controller';
import AccessControl from '../../../middlewares/access.middleware';

const router = Router();

/**
 * Route for getting all product types.
 * @name GET /v1/admin/productTypes
 * @function
 * @memberof module:routes/v1/admin/productType.routes
 * @param {string} role - The role of the user making the request. Only users with the
 * 'ADMIN' role can access this route.
 * @returns {Array} - An array of product types.
 */
router.get('/', AccessControl.authorizeRoles('ADMIN'), ProductTypesController.getAllProductTypes);

/**
 * Route for getting a specific product type by its ID.
 * @name GET /v1/admin/productTypes/:id
 * @function
 * @memberof module:routes/v1/admin/productType.routes
 * @param {string} role - The role of the user making the request. Only users with the
 * 'ADMIN' role can access this route.
 * @param {string} id - The ID of the product type to retrieve.
 * @returns {Object} - The product type object.
 */
router.get('/:id', AccessControl.authorizeRoles('ADMIN'), ProductTypesController.getProductTypeById);

/**
 * Route for updating a specific product type.
 * @name PUT /v1/admin/productTypes/:id
 * @function
 * @memberof module:routes/v1/admin/productType.routes
 * @param {string} role - The role of the user making the request. Only users with the
 * 'ADMIN' role can access this route.
 * @param {string} id - The ID of the product type to update.
 * @returns {Object} - The updated product type object.
 */
router.put('/:id', AccessControl.authorizeRoles('ADMIN'), ProductTypesController.updateProductType);

/**
 * Route for deleting a specific product type.
 * @name DELETE /v1/admin/productTypes/:id
 * @function
 * @memberof module:routes/v1/admin/productType.routes
 * @param {string} role - The role of the user making the request. Only users with the
 * 'ADMIN' role can access this route.
 * @param {string} id - The ID of the product type to delete.
 * @returns {Object} - The deleted product type object.
 */
router.delete('/:id', AccessControl.authorizeRoles('ADMIN'), ProductTypesController.deleteProductType);

/**
 * Route for creating a new product type.
 * @name POST /v1/admin/productTypes
 * @function
 * @memberof module:routes/v1/admin/productType.routes
 * @param {string} role - The role of the user making the request. Only users with the
 * 'ADMIN' role can access this route.
 * @returns {Object} - The created product type object.
 */
router.post('/', AccessControl.authorizeRoles('ADMIN'), ProductTypesController.createProductType);

export default router;
