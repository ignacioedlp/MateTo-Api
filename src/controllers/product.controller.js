
import ProductService from '../services/productServices';
import SupabaseService from '../services/supabaseServices';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import logger from '../config/logger';

const ProductsController = {
  getAllProducts: async (req, res, next) => {
    try {
      const response = await ProductService.getAllProducts(req.query);

      console.log(response);


      res.status(200).json(response);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  getProductById: async (req, res, next) => {
    try {
      const product = await ProductService.getProductById(req.params.id);
      res.status(200).json(product);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  createProduct: async (req, res, next) => {
    try {
      //Obtengo el token y lo decodifico para obtener el id del usuario
      const token = req.headers.authorization?.split(' ')[1];
      const decoded = jwt.verify(token, process.env.SECRET);

      if (!req.files || !req.files.images) {
        throw new Error('No se subieron imagenes');
      }

      // Tomo las images del body y las subo a supabase
      const images = req.files.images;

      const imagesUrls = await SupabaseService.uploadImagesProduct(images, decoded.userId);

      //Creo el producto
      const newProduct = {
        title: req.body.title,
        description: req.body.description,
        price: parseFloat(req.body.price),
        stock: parseInt(req.body.stock),
        authorId: decoded.userId,
        published: req.body.published === 'true' ? true : false,
        typeId: parseInt(req.body.type),
        categoryId: parseInt(req.body.category),
        colors: req.body.colors.map(color => parseInt(color)),
        sizes: req.body.sizes.map(size => parseInt(size)),
        imageUrls: imagesUrls,
      }

      const createdProduct = await ProductService.createProduct(newProduct);


      res.status(httpStatus.CREATED).json(createdProduct);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  updateProduct: async (req, res, next) => {
    try {
      const updatedProduct = await ProductService.updateProduct(req.params.id, req.body);
      res.status(httpStatus.ACCEPTED).json(updatedProduct);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  deleteProduct: async (req, res, next) => {
    try {

      const product = await ProductService.getProductById(req.params.id);

      const imagesUrls = product.imageUrls;

      const imagesUrlsToDelete = [];

      for (const imageUrl of imagesUrls) {
        const imageToDelete = imageUrl.split('cms_mateto/')[1];
        imagesUrlsToDelete.push(imageToDelete);
      }

      //Elimino las imagenes de supabase
      await SupabaseService.deleteImages(imagesUrlsToDelete);

      const deletedProduct = await ProductService.deleteProduct(req.params.id);
      res.status(httpStatus.ACCEPTED).json(deletedProduct);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  }
};

export default ProductsController;