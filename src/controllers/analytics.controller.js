import jwt from 'jsonwebtoken';
import logger from '../config/logger';
import AnalyticService from '../services/analitycServices';

/**
 * Controller for handling analytics related requests.
 * @namespace AnalyticsController
 */
const AnalyticsController = {
  /**
   * Retrieves analytics data for a user.
   * @async
   * @function getAnalytics
   * @memberof AnalyticsController
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {Promise<void>} A promise that resolves when the
   * analytics data is retrieved and sent in the response.
   */
  async getAnalytics(req, res, next) {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      const decoded = jwt.verify(token, process.env.SECRET);

      const { userId } = decoded;

      const analytics = await AnalyticService.getTotalItemsSales(userId);
      const analyticsTwo = await AnalyticService.getTopFiveProducts(userId);

      res.status(200).json({
        data: analytics,
        dataTwo: analyticsTwo,
      });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
};

export default AnalyticsController;
