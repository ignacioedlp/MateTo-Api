const CartService = require('../services/cartServices');
const jwt = require('jsonwebtoken');
const logger = require('../config/logger');


const CartController = {

  getCart: async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      const decoded = jwt.verify(token, process.env.SECRET);

      const cart = await CartService.getCart(decoded.userId);
      res.status(200).json(cart);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  addToCart: async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      const decoded = jwt.verify(token, process.env.SECRET);

      const productToAdd = {
        productId: parseInt(req.body.productId),
        quantity: parseInt(req.body.quantity),
        userId: parseInt(decoded.userId)
      }

      const cart = await CartService.addToCart(productToAdd);
      res.status(200).json(cart);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  removeFromCart: async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      const decoded = jwt.verify(token, process.env.SECRET);

      const productToRemove = {
        userId: parseInt(decoded.userId),
        productId: parseInt(req.params.id)
      }

      const cart = await CartService.removeFromCart(productToRemove);
      res.status(200).json(cart);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  }
};

module.exports = CartController;