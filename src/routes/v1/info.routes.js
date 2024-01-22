import { Router } from 'express';
import InfoController from '../../controllers/info.controller';

const router = Router();

router.get('/', InfoController.getSettings);

export default router;
