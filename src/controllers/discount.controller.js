const DiscountService = require('../services/discountServices');
const jwt = require('jsonwebtoken');
const logger = require('../config/logger');

const DiscountController = {

  getAllDiscounts: async (req, res, next) => {
    try {
      const discounts = await DiscountService.getAllDiscounts();
      res.status(200).json(discounts);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  getAllDiscountsByProduct: async (req, res, next) => {
    try {
      const { id } = req.params;
      const discounts = await DiscountService.getAllDiscountsByProduct(id);
      res.status(200).json(discounts);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  getDiscountById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const discount = await DiscountService.getDiscountById(id);
      res.status(200).json(discount);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  getDiscountsByVendor: async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      const decoded = jwt.verify(token, process.env.SECRET);

      const discounts = await DiscountService.getDiscountsByVendor(decoded.userId);
      res.status(200).json(discounts);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  createDiscount: async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      const decoded = jwt.verify(token, process.env.SECRET);

      const discount = await DiscountService.createDiscount({
        ...req.body,
        createdById: decoded.userId,
      });
      res.status(200).json(discount);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  updateDiscount: async (req, res, next) => {
    try {
      const { id } = req.params;
      const discount = await DiscountService.updateDiscount(id, req.body);
      res.status(200).json(discount);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  deleteDiscount: async (req, res, next) => {
    try {
      const { id } = req.params;
      const discount = await DiscountService.deleteDiscount(id);
      res.status(200).json(discount);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

};

module.exports = DiscountController;