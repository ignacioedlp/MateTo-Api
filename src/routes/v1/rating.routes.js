import { Router } from 'express';
import RatingController from '../../controllers/rating.controller';
import AccessControl from '../../middlewares/access.middleware';

const router = Router();

router.post('/', AccessControl.authorizeRoles('USER'), RatingController.createRating);

router.put('/:id', AccessControl.authorizeRoles('USER'), RatingController.updateRating);

export default router;
