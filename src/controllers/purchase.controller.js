import jwt from 'jsonwebtoken';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import PurchaseService from '../services/purchaseServices';
import ProductServices from '../services/productServices';
import logger from '../config/logger';
import CartServices from '../services/cartServices';

/**
 * Controller for handling purchase-related operations.
 *
 * @namespace PurchasesController
 */
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
      // Obtengo el token y lo decodifico para obtener el id del usuario
      const token = req.headers.authorization?.split(' ')[1];
      const decoded = jwt.verify(token, process.env.SECRET);

      // Creo el objeto purchase
      const newPurchase = {
        userId: parseInt(decoded.userId, 10),
        totalDiscount: parseFloat(req.body.totalDiscount),
        addressLine: req.body.addressLine,
        city: req.body.city,
        state: req.body.state,
        postalCode: req.body.postalCode,
        phoneNumber: req.body.phoneNumber,
      };

      // añado los items de la compra
      const purchaseItems = [];

      req.body.purchaseItems.forEach((item) => {
        purchaseItems.push({
          productId: item.productId,
          quantity: item.quantity,
        });
      });

      newPurchase.purchaseItems = purchaseItems;

      const createdPurchase = await PurchaseService.createPurchase(newPurchase);

      // Update stock
      req.body.purchaseItems.forEach(async (item) => {
        await ProductServices.updateStock(item.productId, item.quantity);
      });

      // Reinicioar carrito
      await CartServices.emptyCart(decoded.userId);

      const items = [{
        id: createdPurchase.id,
        title: `${req.body.purchaseItems.map((item) => item.title).join(', ')}`,
        unit_price: req.body.purchaseItems
          .reduce((acc, item) => acc + item.price * item.quantity, 0),
        quantity: 1,
      }];

      const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_KEY });

      const preference = await new Preference(client).create({
        body: {
          items,
          external_reference: createdPurchase.id,
        },
      });

      res.status(201).json({ createdPurchase, preference });
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },
};

export default PurchasesController;
