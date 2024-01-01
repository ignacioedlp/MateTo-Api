const express = require('express');
const router = express.Router();

// Importar el controlador de usuarios
const CommentController = require('../../controllers/comment.controller');

// Importar el middleware de autorización
const AccessControl = require('../../middlewares/access.middleware');

// Get all comments
router.get('/', AccessControl.authorizeRoles('ADMIN'), CommentController.getAllComments);

// Get comments of one product
router.get('/:id', CommentController.getCommentsOfOneProduct);

// Create comment
router.post('/', CommentController.createComment);

// Delete comment
router.delete('/:id', AccessControl.authorizeRoles('ADMIN', 'VENDOR'), CommentController.deleteComment);

module.exports = router;