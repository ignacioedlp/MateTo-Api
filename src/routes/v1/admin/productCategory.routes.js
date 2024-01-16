import { Router } from 'express';
import ProductCategoriesController from '../../../controllers/admin/productCategory.controller';
import AccessControl from '../../../middlewares/access.middleware';

const router = Router();

/**
 * Route for getting all product categories.
 * @name GET /v1/admin/product-categories
 * @function
 * @memberof module:routes/v1/admin/productCategory.routes
 * @param {string} role - The role of the user making the request. Only users with the
 * 'ADMIN' role can access this route.
 * @returns {Array} - An array of product categories.
 */
router.get('/', AccessControl.authorizeRoles('ADMIN'), ProductCategoriesController.getAllProductCategories);

/**
 * Route for getting a specific product category by its ID.
 * @name GET /v1/admin/product-categories/:id
 * @function
 * @memberof module:routes/v1/admin/productCategory.routes
 * @param {string} role - The role of the user making the request. Only users with the
 * 'ADMIN' role can access this route.
 * @param {string} id - The ID of the product category to retrieve.
 * @returns {Object} - The product category object.
 */
router.get('/:id', AccessControl.authorizeRoles('ADMIN'), ProductCategoriesController.getProductCategoryById);

/**
 * Route for updating a product category.
 * @name PUT /v1/admin/product-categories/:id
 * @function
 * @memberof module:routes/v1/admin/productCategory.routes
 * @param {string} role - The role of the user making the request. Only users with the
 * 'ADMIN' role can access this route.
 * @param {string} id - The ID of the product category to update.
 * @returns {Object} - The updated product category object.
 */
router.put('/:id', AccessControl.authorizeRoles('ADMIN'), ProductCategoriesController.updateProductCategory);

/**
 * Route for deleting a product category.
 * @name DELETE /v1/admin/product-categories/:id
 * @function
 * @memberof module:routes/v1/admin/productCategory.routes
 * @param {string} role - The role of the user making the request. Only users with the
 * 'ADMIN' role can access this route.
 * @param {string} id - The ID of the product category to delete.
 * @returns {Object} - The deleted product category object.
 */
router.delete('/:id', AccessControl.authorizeRoles('ADMIN'), ProductCategoriesController.deleteProductCategory);

/**
 * Route for creating a new product category.
 * @name POST /v1/admin/product-categories
 * @function
 * @memberof module:routes/v1/admin/productCategory.routes
 * @returns {Object} - The created product category object.
 */
router.post('/', AccessControl.authorizeRoles('ADMIN'), ProductCategoriesController.createProductCategory);

export default router;
