// API /profile
import { Router } from 'express';
import AccessControl from '../../middlewares/access.middleware';
const router = Router();

import OrderController from '../../controllers/order.controller';

router.get('/', AccessControl.authorizeRoles('ADMIN', 'VENDOR'), OrderController.getAllOrders);

export default router;

