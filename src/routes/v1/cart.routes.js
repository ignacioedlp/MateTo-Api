import { Router } from 'express';
import CartController from '../../controllers/cart.controller';

const router = Router();

/**
 * GET /api/v1/cart
 * @description Get the cart.
 * @route {GET} /api/v1/cart
 * @returns {Object} The cart object.
 */
router.get('/', CartController.getCart);

/**
 * POST /api/v1/cart
 * @description Add an item to the cart.
 * @route {POST} /api/v1/cart
 * @returns {Object} The added item.
 */
router.post('/', CartController.addToCart);

/**
 * DELETE /api/v1/cart/:id
 * @description Remove an item from the cart.
 * @route {DELETE} /api/v1/cart/:id
 * @param {string} id - The ID of the item to be removed.
 * @returns {Object} The removed item.
 */
router.delete('/:id', CartController.removeFromCart);

export default router;
