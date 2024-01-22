import { Router } from 'express';
import FavoriteController from '../../controllers/favorite.controller';

const router = Router();

/**
 * GET /api/v1/favorites
 * @description Get all favorites.
 * @route GET /api/v1/favorites
 * @group Favorites - Operations related to favorites
 * @returns {Array} 200 - An array of favorite items
 * @returns {Error}  500 - Unexpected error
 */
router.get('/', FavoriteController.getFavorites);

/**
 * GET /api/v1/favorites/:id
 * @description Add an item to favorites.
 * @route GET /api/v1/favorites/:id
 * @group Favorites - Operations related to favorites
 * @param {string} id.path.required - The ID of the item to add to favorites
 * @returns {Object} 200 - The added favorite item
 * @returns {Error}  500 - Unexpected error
 */
router.get('/:id', FavoriteController.addToFavorites);

/**
 * DELETE /api/v1/favorites/:id
 * @description Remove an item from favorites.
 * @route DELETE /api/v1/favorites/:id
 * @group Favorites - Operations related to favorites
 * @param {string} id.path.required - The ID of the item to remove from favorites
 * @returns {Object} 200 - The removed favorite item
 * @returns {Error}  500 - Unexpected error
 */
router.delete('/:id', FavoriteController.removeFromFavorites);

export default router;
