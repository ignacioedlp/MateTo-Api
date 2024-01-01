const RatingService = require('../services/ratingServices');
const jwt = require('jsonwebtoken');
const logger = require('../config/logger');

const RatingController = {
  async createRating(req, res) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const decoded = jwt.verify(token, process.env.SECRET);

      const { productId, value } = req.body;
      const ratingData = {
        authorId: decoded.userId,
        productId,
        value
      };
      const newRating = await RatingService.createRating(ratingData);
      res.status(201).json(newRating);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ error: error.message });
    }
  },

  async updateRating(req, res) {
    try {
      const { id } = req.params;
      const { value } = req.body;
      const updatedRating = await RatingService.updateRating(id, value);
      res.status(200).json(updatedRating);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ error: error.message });
    }
  },

  async deleteRating(req, res) {
    try {
      const { id } = req.params;
      const deletedRating = await RatingService.deleteRating(id);
      res.status(200).json(deletedRating);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = RatingController;