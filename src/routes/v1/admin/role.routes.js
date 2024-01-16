import { Router } from 'express';
import RolesController from '../../../controllers/admin/role.controller';
import AccessControl from '../../../middlewares/access.middleware';

const router = Router();

/**
 * Route for getting all roles.
 * @name GET /v1/admin/roles
 * @function
 * @memberof module:routes/v1/admin/role.routes
 * @param {function} AccessControl.authorizeRoles - Middleware function for authorizing roles.
 * @param {function} RolesController.getAllRoles - Controller function for getting all roles.
 */
router.get('/', AccessControl.authorizeRoles('ADMIN'), RolesController.getAllRoles);

/**
 * Route for getting a role by ID.
 * @name GET /v1/admin/roles/:id
 * @function
 * @memberof module:routes/v1/admin/role.routes
 * @param {function} AccessControl.authorizeRoles - Middleware function for authorizing roles.
 * @param {function} RolesController.getRoleById - Controller function for getting a role by ID.
 */
router.get('/:id', AccessControl.authorizeRoles('ADMIN'), RolesController.getRoleById);

/**
 * Route for updating a role.
 * @name PUT /v1/admin/roles/:id
 * @function
 * @memberof module:routes/v1/admin/role.routes
 * @param {function} AccessControl.authorizeRoles - Middleware function for authorizing roles.
 * @param {function} RolesController.updateRole - Controller function for updating a role.
 */
router.put('/:id', AccessControl.authorizeRoles('ADMIN'), RolesController.updateRole);

/**
 * Route for deleting a role.
 * @name DELETE /v1/admin/roles/:id
 * @function
 * @memberof module:routes/v1/admin/role.routes
 * @param {function} AccessControl.authorizeRoles - Middleware function for authorizing roles.
 * @param {function} RolesController.deleteRole - Controller function for deleting a role.
 */
router.delete('/:id', AccessControl.authorizeRoles('ADMIN'), RolesController.deleteRole);

/**
 * Route for creating a new role.
 * @name POST /v1/admin/roles
 * @function
 * @memberof module:routes/v1/admin/role.routes
 * @param {function} AccessControl.authorizeRoles - Middleware function for authorizing roles.
 * @param {function} RolesController.createRole - Controller function for creating a new role.
 */
router.post('/', AccessControl.authorizeRoles('ADMIN'), RolesController.createRole);

export default router;
