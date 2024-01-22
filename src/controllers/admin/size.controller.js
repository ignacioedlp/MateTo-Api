import SizeService from '../../services/sizeServices';
import logger from '../../config/logger';

/**
 * Controller for managing sizes.
 * @namespace SizesController
 */
const SizesController = {
  getAllSizes: async (req, res, next) => {
    try {
      const sizes = await SizeService.getAllSizes();
      res.status(200).json(sizes);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  getSizeById: async (req, res, next) => {
    try {
      const size = await SizeService.getSizeById(req.params.id);
      res.status(200).json(size);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  createSize: async (req, res, next) => {
    try {
      const createdSize = await SizeService.createSize(req.body);
      res.status(201).json(createdSize);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  updateSize: async (req, res, next) => {
    try {
      const updatedSize = await SizeService.updateSize(req.params.id, req.body);
      res.status(200).json(updatedSize);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  deleteSize: async (req, res, next) => {
    try {
      const deletedSize = await SizeService.deleteSize(req.params.id);
      res.status(200).json(deletedSize);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },
};

export default SizesController;
