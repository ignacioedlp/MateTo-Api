import jwt from 'jsonwebtoken';
import OrderServices from '../services/orderServices';
import logger from '../config/logger';

/**
 * Controller for handling orders.
 * @namespace OrdersController
 */
const OrdersController = {
  getAllOrders: async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      const decoded = jwt.verify(token, process.env.SECRET);

      const orders = await OrderServices.getOrdersByVendor(decoded.userId);

      const productsGroupedByPurchase = orders.reduce((acc, order) => {
        const { purchase } = order;
        if (!acc[purchase.id]) {
          acc[purchase.id] = {
            ...purchase,
            products: [],
          };
        }
        const productWithQuantity = {
          ...order.product,
          quantity: order.quantity,
        };
        acc[purchase.id].products.push(productWithQuantity);
        return acc;
      }, {});

      res.status(200).json(Object.values(productsGroupedByPurchase));
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },
};

export default OrdersController;
