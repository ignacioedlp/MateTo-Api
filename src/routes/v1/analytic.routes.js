// API /profile
import { Router } from 'express';
import AnalyticsController from '../../controllers/analytics.controller';
import AccessControl from '../../middlewares/access.middleware';
const router = Router();


router.get('/', AccessControl.authorizeRoles('ADMIN', 'VENDOR'), AnalyticsController.getAnalytics);

export default router;

