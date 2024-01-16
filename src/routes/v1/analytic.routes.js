import { Router } from 'express';
import AnalyticsController from '../../controllers/analytics.controller';
import AccessControl from '../../middlewares/access.middleware';

const router = Router();

/**
 * Route for retrieving analytics data.
 * @name GET /v1/analytics
 * @function
 * @memberof module:routes/v1/analytic.routes
 * @param {string} role - The role of the user making the request.
 * @returns {Object} The analytics data.
 */
router.get('/', AccessControl.authorizeRoles('ADMIN', 'VENDOR'), AnalyticsController.getAnalytics);

export default router;
