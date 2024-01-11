import { Router } from 'express';
const router = Router();


// Importar el controlador de usuarios
import RatingController from '../../controllers/rating.controller';

// Importar el middleware de autorización
import AccessControl from '../../middlewares/access.middleware';


// Create Rating
router.post('/', AccessControl.authorizeRoles('USER'), RatingController.createRating);

// Update Rating
router.put('/:id', AccessControl.authorizeRoles('USER'), RatingController.updateRating);

export default router;