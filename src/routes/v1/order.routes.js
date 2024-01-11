// API /profile
import { Router } from 'express';
const router = Router();

import InfoController from '../../controllers/info.controller';

router.get('/', InfoController.getOrders);

export default router;

