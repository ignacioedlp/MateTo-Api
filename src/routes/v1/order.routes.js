import { Router } from 'express';
import AccessControl from '../../middlewares/access.middleware';

import OrderController from '../../controllers/order.controller';

const router = Router();

router.get('/', AccessControl.authorizeRoles('ADMIN', 'VENDOR'), OrderController.getAllOrders);

export default router;
