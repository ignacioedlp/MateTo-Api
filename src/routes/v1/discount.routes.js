import { Router } from 'express';
import DiscountController from '../../controllers/discount.controller';
import AccessControl from '../../middlewares/access.middleware';

const router = Router();

/**
 * GET /api/v1/discounts
 * @description Get all discounts.
 * @access Public
 * @memberof module:routes/v1/discount.routes
 * @name GET/api/v1/discounts
 * @function
 */
router.get('/', AccessControl.authorizeRoles('ADMIN'), DiscountController.getAllDiscounts);

/**
 * GET /api/v1/discounts/product/:id
 * @description Get all discounts by product ID.
 * @param {string} id - The ID of the product.
 * @access Public
 * @memberof module:routes/v1/discount.routes
 * @name GET/api/v1/discounts/product/:id
 * @function
 */
router.get('/product/:id', DiscountController.getAllDiscountsByProduct);

/**
 * GET /api/v1/discounts/vendor
 * @description Get all discounts by vendor.
 * @access Public
 * @memberof module:routes/v1/discount.routes
 * @name GET/api/v1/discounts/vendor
 * @function
 */
router.get('/vendor', AccessControl.authorizeRoles('ADMIN', 'VENDOR'), DiscountController.getDiscountsByVendor);

/**
 * GET /api/v1/discounts/:id
 * @description Get a discount by ID.
 * @param {string} id - The ID of the discount.
 * @access Public
 * @memberof module:routes/v1/discount.routes
 * @name GET/api/v1/discounts/:id
 * @function
 */
router.get('/:id', DiscountController.getDiscountById);

/**
 * POST /api/v1/discounts
 * @description Create a new discount.
 * @access Private (requires authentication)
 * @memberof module:routes/v1/discount.routes
 * @name POST/api/v1/discounts
 * @function
 */
router.post('/', AccessControl.authorizeRoles('ADMIN', 'VENDOR'), DiscountController.createDiscount);

/**
 * PUT /api/v1/discounts/:id
 * @description Update a discount by ID.
 * @param {string} id - The ID of the discount.
 * @access Private (requires authentication)
 * @memberof module:routes/v1/discount.routes
 * @name PUT/api/v1/discounts/:id
 * @function
 */
router.put('/:id', AccessControl.authorizeRoles('ADMIN', 'VENDOR'), DiscountController.updateDiscount);

/**
 * DELETE /api/v1/discounts/:id
 * @description Delete a discount by ID.
 * @param {string} id - The ID of the discount.
 * @access Private (requires authentication)
 * @memberof module:routes/v1/discount.routes
 * @name DELETE/api/v1/discounts/:id
 * @function
 */
router.delete('/:id', AccessControl.authorizeRoles('ADMIN', 'VENDOR'), DiscountController.deleteDiscount);

export default router;
