import jwt from 'jsonwebtoken';
import CartService from '../services/cartServices';
import logger from '../config/logger';

/**
 * Controller for managing the cart.
 *
 * @namespace CartController
 */
const CartController = {

  getCart: async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      const decoded = jwt.verify(token, process.env.SECRET);

      const cart = await CartService.getCart(decoded.userId);
      res.status(200).json(cart.cartItems);
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
        productId: parseInt(req.body.productId, 10),
        quantity: parseInt(req.body.quantity, 10),
        userId: parseInt(decoded.userId, 10),
      };

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
        userId: parseInt(decoded.userId, 10),
        productId: parseInt(req.params.id, 10),
      };

      const cart = await CartService.removeFromCart(productToRemove);
      res.status(200).json(cart);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },
};

export default CartController;
