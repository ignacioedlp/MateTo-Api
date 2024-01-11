import ColorService from '../services/colorServices'
import logger from '../config/logger';

const ColorsController = {
  getAllColors: async (req, res, next) => {
    try {
      const colors = await ColorService.getAllColors();
      res.status(200).json(colors);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  getColorById: async (req, res, next) => {
    try {
      const color = await ColorService.getColorById(req.params.id);
      res.status(200).json(color);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  createColor: async (req, res, next) => {
    try {
      const createdColor = await ColorService.createColor(req.body);
      res.status(201).json(createdColor);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  updateColor: async (req, res, next) => {
    try {
      const updatedColor = await ColorService.updateColor(req.params.id, req.body);
      res.status(200).json(updatedColor);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  deleteColor: async (req, res, next) => {
    try {
      const deletedColor = await ColorService.deleteColor(req.params.id);
      res.status(200).json(deletedColor);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  }
};

export default ColorsController;