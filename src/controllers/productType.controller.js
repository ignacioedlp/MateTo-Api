const ProductTypeService = require('../services/productTypeServices');
const logger = require('../config/logger');

const ProductTypesController = {
  getAllProductTypes: async (req, res, next) => {
    try {
      const productTypes = await ProductTypeService.getAllProductTypes();
      res.status(200).json(productTypes);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  getProductTypeById: async (req, res, next) => {
    try {
      const productType = await ProductTypeService.getProductTypeById(req.params.id);
      res.status(200).json(productType);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  createProductType: async (req, res, next) => {
    try {
      const createdProductType = await ProductTypeService.createProductType(req.body);
      res.status(201).json(createdProductType);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  updateProductType: async (req, res, next) => {
    try {
      const updatedProductType = await ProductTypeService.updateProductType(req.params.id, req.body);
      res.status(200).json(updatedProductType);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  deleteProductType: async (req, res, next) => {
    try {
      const deletedProductType = await ProductTypeService.deleteProductType(req.params.id);
      res.status(200).json(deletedProductType);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  }
};

module.exports = ProductTypesController;