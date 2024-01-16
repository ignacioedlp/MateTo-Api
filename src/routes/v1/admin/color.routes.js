import { Router } from 'express';
import ColorsController from '../../../controllers/admin/color.controller';
import AccessControl from '../../../middlewares/access.middleware';

const router = Router();

/**
 * Route for getting all colors.
 * @name GET /v1/admin/colors
 * @function
 * @memberof module:routes/v1/admin/color.routes
 * @param {string} role - The role of the user making the request. Only users with the
 * 'ADMIN' role can access this route.
 * @returns {Array} - An array of color objects.
 */
router.get('/', AccessControl.authorizeRoles('ADMIN'), ColorsController.getAllColors);

/**
 * Route for getting a color by its ID.
 * @name GET /v1/admin/colors/:id
 * @function
 * @memberof module:routes/v1/admin/color.routes
 * @param {string} role - The role of the user making the request. Only users with the
 * 'ADMIN' role can access this route.
 * @param {string} id - The ID of the color to retrieve.
 * @returns {Object} - The color object.
 */
router.get('/:id', AccessControl.authorizeRoles('ADMIN'), ColorsController.getColorById);

/**
 * Route for updating a color.
 * @name PUT /v1/admin/colors/:id
 * @function
 * @memberof module:routes/v1/admin/color.routes
 * @param {string} role - The role of the user making the request. Only users with the
 * 'ADMIN' role can access this route.
 * @param {string} id - The ID of the color to update.
 * @returns {Object} - The updated color object.
 */
router.put('/:id', AccessControl.authorizeRoles('ADMIN'), ColorsController.updateColor);

/**
 * Route for deleting a color.
 * @name DELETE /v1/admin/colors/:id
 * @function
 * @memberof module:routes/v1/admin/color.routes
 * @param {string} role - The role of the user making the request. Only users with the
 * 'ADMIN' role can access this route.
 * @param {string} id - The ID of the color to delete.
 * @returns {Object} - The deleted color object.
 */
router.delete('/:id', AccessControl.authorizeRoles('ADMIN'), ColorsController.deleteColor);

/**
 * Route for creating a new color.
 * @name POST /v1/admin/colors
 * @function
 * @memberof module:routes/v1/admin/color.routes
 * @returns {Object} - The created color object.
 */
router.post('/', AccessControl.authorizeRoles('ADMIN'), ColorsController.createColor);

export default router;
