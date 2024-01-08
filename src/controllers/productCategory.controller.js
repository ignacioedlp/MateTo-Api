const ProductCategoryService = require('../services/productCategoryServices');
const logger = require('../config/logger');

const ProductCategorysController = {
  getAllProductCategories: async (req, res, next) => {
    try {
      const productCategorys = await ProductCategoryService.getAllProductCategories();
      res.status(200).json(productCategorys);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  getProductCategoryById: async (req, res, next) => {
    try {
      const productCategory = await ProductCategoryService.getProductCategoryById(req.params.id);
      res.status(200).json(productCategory);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  createProductCategory: async (req, res, next) => {
    try {
      const createdProductCategory = await ProductCategoryService.createProductCategory(req.body);
      res.status(201).json(createdProductCategory);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  updateProductCategory: async (req, res, next) => {
    try {
      const updatedProductCategory = await ProductCategoryService.updateProductCategory(req.params.id, req.body);
      res.status(200).json(updatedProductCategory);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  deleteProductCategory: async (req, res, next) => {
    try {
      const deletedProductCategory = await ProductCategoryService.deleteProductCategory(req.params.id);
      res.status(200).json(deletedProductCategory);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  }
};

module.exports = ProductCategorysController;