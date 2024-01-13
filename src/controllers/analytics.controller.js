import jwt from 'jsonwebtoken';
import logger from '../config/logger';
import AnalyticService from '../services/analitycServices';



const AnalyticsController = {
  async getAnalytics(req, res, next) {
    try {

      const token = req.headers.authorization?.split(' ')[1];

      const decoded = jwt.verify(token, process.env.SECRET);
    }
    catch (error) {
      logger.error(error);
      next(error);
    }
  }
}

export default AnalyticsController;
