import jwt from 'jsonwebtoken';
import FavoriteService from '../services/favoriteServices';
import logger from '../config/logger';

/**
 * Controller for managing favorite products.
 * @namespace FavoriteController
 */
const FavoriteController = {

  getFavorites: async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      const decoded = jwt.verify(token, process.env.SECRET);

      const { favoriteProducts } = await FavoriteService.getFavorites(decoded.userId);

      const products = favoriteProducts.map((fav) => ({
        id: fav.product.id,
        title: fav.product.title,
        price: fav.product.price,
        imageUrls: fav.product.imageUrls,
      }));

      res.status(200).json(products);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  addToFavorites: async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      const decoded = jwt.verify(token, process.env.SECRET);

      const productToAdd = {
        userId: parseInt(decoded.userId, 10),
        productId: parseInt(req.params.id, 10),
      };

      const favorite = await FavoriteService.addToFavorites(productToAdd);
      res.status(200).json(favorite);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  removeFromFavorites: async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      const decoded = jwt.verify(token, process.env.SECRET);

      const productToRemove = {
        userId: parseInt(decoded.userId, 10),
        productId: parseInt(req.params.id, 10),
      };

      await FavoriteService.removeFromFavorites(productToRemove);

      const { favoriteProducts } = await FavoriteService.getFavorites(decoded.userId);

      const products = favoriteProducts.map((fav) => ({
        id: fav.product.id,
        title: fav.product.title,
        price: fav.product.price,
        imageUrls: fav.product.imageUrls,
      }));

      res.status(200).json(products);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },
};

export default FavoriteController;
