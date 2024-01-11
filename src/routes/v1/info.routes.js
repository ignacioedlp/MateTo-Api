// API /profile
import { Router } from 'express';
const router = Router();

import InfoController from '../../controllers/info.controller';

router.get('/', InfoController.getSettings);

export default router;
