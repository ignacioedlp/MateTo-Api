import { Router } from 'express';
import CommentController from '../../controllers/comment.controller';
import AccessControl from '../../middlewares/access.middleware';

const router = Router();

/**
 * Route for getting all comments.
 * @name GET /v1/comments
 * @function
 * @memberof module:routes/v1/comment.routes
 * @param {string} role - The role of the user making the request.
 * @returns {Array} - An array of comments.
 */
router.get('/', AccessControl.authorizeRoles('ADMIN'), CommentController.getAllComments);

/**
 * Route for getting comments of a specific product.
 * @name GET /v1/comments/:id
 * @function
 * @memberof module:routes/v1/comment.routes
 * @param {string} id - The ID of the product.
 * @returns {Array} - An array of comments.
 */
router.get('/:id', CommentController.getCommentsOfOneProduct);

/**
 * Route for creating a new comment.
 * @name POST /v1/comments
 * @function
 * @memberof module:routes/v1/comment.routes
 * @returns {Object} - The created comment.
 */
router.post('/', CommentController.createComment);

/**
 * Route for deleting a comment.
 * @name DELETE /v1/comments/:id
 * @function
 * @memberof module:routes/v1/comment.routes
 * @param {string} id - The ID of the comment to delete.
 * @returns {Object} - The deleted comment.
 */
router.delete('/:id', AccessControl.authorizeRoles('ADMIN', 'VENDOR'), CommentController.deleteComment);

export default router;
