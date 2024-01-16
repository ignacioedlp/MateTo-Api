import { Router } from 'express';
import SizesController from '../../../controllers/admin/size.controller';
import AccessControl from '../../../middlewares/access.middleware';

const router = Router();

/**
 * Route for getting all sizes.
 * @name GET /v1/admin/sizes
 * @function
 * @memberof module:routes/v1/admin/size.routes
 * @param {string} role - The role of the user making the request. Only users with the
 * 'ADMIN' role can access this route.
 * @returns {Array} - An array of all sizes.
 */
router.get('/', AccessControl.authorizeRoles('ADMIN'), SizesController.getAllSizes);

/**
 * Route for getting a size by its ID.
 * @name GET /v1/admin/sizes/:id
 * @function
 * @memberof module:routes/v1/admin/size.routes
 * @param {string} role - The role of the user making the request. Only users with the
 * 'ADMIN' role can access this route.
 * @param {string} id - The ID of the size to retrieve.
 * @returns {Object} - The size object with the specified ID.
 */
router.get('/:id', AccessControl.authorizeRoles('ADMIN'), SizesController.getSizeById);

/**
 * Route for updating a size.
 * @name PUT /v1/admin/sizes/:id
 * @function
 * @memberof module:routes/v1/admin/size.routes
 * @param {string} role - The role of the user making the request. Only users with the
 * 'ADMIN' role can access this route.
 * @param {string} id - The ID of the size to update.
 * @returns {Object} - The updated size object.
 */
router.put('/:id', AccessControl.authorizeRoles('ADMIN'), SizesController.updateSize);

/**
 * Route for deleting a size.
 * @name DELETE /v1/admin/sizes/:id
 * @function
 * @memberof module:routes/v1/admin/size.routes
 * @param {string} role - The role of the user making the request. Only users with the
 * 'ADMIN' role can access this route.
 * @param {string} id - The ID of the size to delete.
 * @returns {Object} - The deleted size object.
 */
router.delete('/:id', AccessControl.authorizeRoles('ADMIN'), SizesController.deleteSize);

/**
 * Route for creating a new size.
 * @name POST /v1/admin/sizes
 * @function
 * @memberof module:routes/v1/admin/size.routes
 * @param {string} role - The role of the user making the request. Only users with the
 * 'ADMIN' role can access this route.
 * @returns {Object} - The newly created size object.
 */
router.post('/', AccessControl.authorizeRoles('ADMIN'), SizesController.createSize);

export default router;
