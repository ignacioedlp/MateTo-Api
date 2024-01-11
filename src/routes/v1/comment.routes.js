import { Router } from 'express';
const router = Router();

// Importar el controlador de usuarios
import CommentController from '../../controllers/comment.controller';

// Importar el middleware de autorización
import AccessControl from '../../middlewares/access.middleware';

// Get all comments
router.get('/', AccessControl.authorizeRoles('ADMIN'), CommentController.getAllComments);

// Get comments of one product
router.get('/:id', CommentController.getCommentsOfOneProduct);

// Create comment
router.post('/', CommentController.createComment);

// Delete comment
router.delete('/:id', AccessControl.authorizeRoles('ADMIN', 'VENDOR'), CommentController.deleteComment);

export default router;