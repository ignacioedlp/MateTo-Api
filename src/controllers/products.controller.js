const ProductService = require('../services/productServices');
const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');

const ProductsController = {
  getAllProducts: async (req, res, next) => {
    try {
      const products = await ProductService.getAllProducts();
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  },

  getAllProductsForVendor: async (req, res, next) => {
    try {
      const products = await ProductService.getAllProductsForVendor(req.params.id);
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  },

  getProductById: async (req, res, next) => {
    try {
      const product = await ProductService.getProductById(req.params.id);
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  },

  createProduct: async (req, res, next) => {
    try {
      //Obtengo el token y lo decodifico para obtener el id del usuario
      const token = req.headers.authorization?.split(' ')[1];
      const decoded = jwt.verify(token, process.env.SECRET);

      //Creo el producto
      const newProduct = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        authorId: decoded.userId,
        published: req.body.published,
        type: req.body.type,
        category: req.body.category,
        colors: req.body.colors,
        sizes: req.body.sizes,
        imageUrls: req.body.imageUrls,
      }


      const createdProduct = await ProductService.createProduct(newProduct);
      res.status(httpStatus.CREATED).json(createdProduct);
    } catch (err) {
      next(err);
    }
  },

  updateProduct: async (req, res, next) => {
    try {
      const updatedProduct = await ProductService.updateProduct(req.params.id, req.body);
      res.status(httpStatus.ACCEPTED).json(updatedProduct);
    } catch (err) {
      next(err);
    }
  },

  deleteProduct: async (req, res, next) => {
    try {
      const deletedProduct = await ProductService.deleteProduct(req.params.id);
      res.status(httpStatus.ACCEPTED).json(deletedProduct);
    } catch (err) {
      next(err);
    }
  }
};

module.exports = ProductsController;