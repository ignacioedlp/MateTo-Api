const FavoriteService = require('../services/favoriteServices');
const jwt = require('jsonwebtoken');
const logger = require('../config/logger');

const FavoriteController = {

  getFavorites: async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      const decoded = jwt.verify(token, process.env.SECRET);

      const favorite = await FavoriteService.getFavorites(decoded.userId);
      res.status(200).json(favorite);
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
        userId: parseInt(decoded.userId),
        productId: parseInt(req.params.id)
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
        userId: parseInt(decoded.userId),
        productId: parseInt(req.params.id)
      };

      const favorite = await FavoriteService.removeFromFavorites(productToRemove);
      res.status(200).json(favorite);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  }
};

module.exports = FavoriteController;