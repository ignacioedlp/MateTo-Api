const CommentService = require('../services/commentServices');
const jwt = require('jsonwebtoken');
const logger = require('../config/logger');

const CommentController = {

  getAllComments: async (req, res, next) => {
    try {
      const comments = await CommentService.getAllComments();
      res.status(200).json(comments);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  getCommentsOfOneProduct: async (req, res, next) => {
    try {
      const { id } = req.params;
      const comments = await CommentService.getCommentsOfOneProduct(id);
      res.status(200).json(comments);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  createComment: async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      const decoded = jwt.verify(token, process.env.SECRET);

      const comment = await CommentService.createComment({
        ...req.body,
        authorId: decoded.userId,
      });
      res.status(200).json(comment);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  deleteComment: async (req, res, next) => {
    try {
      const { id } = req.params;
      const comment = await CommentService.deleteComment(id);
      res.status(200).json(comment);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

};

module.exports = CommentController;