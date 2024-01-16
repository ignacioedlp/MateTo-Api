import { Router } from 'express';
import PurchasesController from '../../controllers/purchase.controller';
import AccessControl from '../../middlewares/access.middleware';

const router = Router();

/**
 * Route for getting all purchases.
 * @name GET /v1/purchases
 * @function
 * @memberof module:routes/v1/purchase.routes
 * @param {string} role - The role of the user making the request.
 * @returns {Array} - An array of all purchases.
 */
router.get('/', AccessControl.authorizeRoles('ADMIN'), PurchasesController.getAllPurchases);

/**
 * Route for getting all purchases of a specific vendor.
 * @name GET /v1/purchases/vendor/:id
 * @function
 * @memberof module:routes/v1/purchase.routes
 * @param {string} role - The role of the user making the request.
 * @param {string} id - The ID of the vendor.
 * @returns {Array} - An array of all purchases of the specified vendor.
 */
router.get('/vendor/:id', AccessControl.authorizeRoles('ADMIN', 'VENDOR'), PurchasesController.getAllProductsPurchasesOfOneVendor);

/**
 * Route for getting all purchases of a specific user.
 * @name GET /v1/purchases/user
 * @function
 * @memberof module:routes/v1/purchase.routes
 * @returns {Array} - An array of all purchases made by the user.
 */
router.get('/user', PurchasesController.getAllPurchasesOfOneUser);

/**
 * Route for getting a purchase by ID.
 * @name GET /v1/purchases/:id
 * @function
 * @memberof module:routes/v1/purchase.routes
 * @param {string} role - The role of the user making the request.
 * @param {string} id - The ID of the purchase.
 * @returns {Object} - The purchase object.
 */
router.get('/:id', AccessControl.checkIfIsAuthorOrUserPurchase, PurchasesController.getPurchaseById);

/**
 * Route for creating a new purchase.
 * @name POST /v1/purchases
 * @function
 * @memberof module:routes/v1/purchase.routes
 * @returns {Object} - The created purchase object.
 */
router.post('/', PurchasesController.createPurchase);

export default router;
