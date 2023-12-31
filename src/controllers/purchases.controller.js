const PurchaseService = require('../services/purchaseServices');
const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');

const PurchasesController = {
  getAllPurchases: async (req, res, next) => {
    try {
      const purchases = await PurchaseService.getAllPurchasesOfOneUser();
      res.status(200).json(purchases);
    } catch (err) {
      next(err);
    }
  },

  getAllPurchasesOfOneVendor: async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const decoded = jwt.verify(token, process.env.SECRET);
      const purchases = await PurchaseService.getAllPurchasesOfOneVendor(decoded.userId);
      res.status(200).json(purchases);
    } catch (err) {
      next(err);
    }
  },

  getAllPurchasesOfOneUser: async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const decoded = jwt.verify(token, process.env.SECRET);
      const purchases = await PurchaseService.getAllPurchases(decoded.userId);
      res.status(200).json(purchases);
    } catch (err) {
      next(err);
    }
  },

  getPurchaseById: async (req, res, next) => {
    try {
      const purchase = await PurchaseService.getPurchaseById(req.params.id);
      res.status(200).json(purchase);
    } catch (err) {
      next(err);
    }
  },

  createPurchase: async (req, res, next) => {
    try {
      //Obtengo el token y lo decodifico para obtener el id del usuario
      const token = req.headers.authorization?.split(' ')[1];
      const decoded = jwt.verify(token, process.env.SECRET);

      

      const createdPurchase = await PurchaseService.createPurchase(newPurchase);

      res.status(httpStatus.CREATED).json(createdPurchase);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PurchasesController;