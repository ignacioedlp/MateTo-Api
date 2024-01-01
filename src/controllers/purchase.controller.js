const PurchaseService = require('../services/purchaseServices');
const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const logger = require('../config/logger');

const PurchasesController = {
  getAllPurchases: async (req, res, next) => {
    try {
      const purchases = await PurchaseService.getAllPurchases();
      res.status(200).json(purchases);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  getAllProductsPurchasesOfOneVendor: async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const decoded = jwt.verify(token, process.env.SECRET);
      const purchases = await PurchaseService.getAllPurchasesOfOneVendor(decoded.userId);
      res.status(200).json(purchases);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  getAllPurchasesOfOneUser: async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const decoded = jwt.verify(token, process.env.SECRET);
      const purchases = await PurchaseService.getAllPurchasesOfOneUser(decoded.userId);
      res.status(200).json(purchases);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  getPurchaseById: async (req, res, next) => {
    try {
      const purchase = await PurchaseService.getPurchaseById(req.params.id);
      res.status(200).json(purchase);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  createPurchase: async (req, res, next) => {
    try {
      //Obtengo el token y lo decodifico para obtener el id del usuario
      const token = req.headers.authorization?.split(' ')[1];
      const decoded = jwt.verify(token, process.env.SECRET);

      //Creo el objeto purchase
      const newPurchase = {
        userId: parseInt(decoded.userId),
        totalDiscount: parseFloat(req.body.totalDiscount),
        addressLine: req.body.addressLine,
        city: req.body.city,
        state: req.body.state,
        postalCode: req.body.postalCode,
        phoneNumber: req.body.phoneNumber
      }

      // añado los items de la compra
      const purchaseItems = [];

      req.body.purchaseItems.forEach(item => {
        purchaseItems.push({
          productId: item.productId,
          quantity: item.quantity
        });
      });

      newPurchase.purchaseItems = purchaseItems;

      const createdPurchase = await PurchaseService.createPurchase(newPurchase);

      res.status(httpStatus.CREATED).json(createdPurchase);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  }
}

module.exports = PurchasesController;