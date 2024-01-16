import logger from '../config/logger';
import SettingService from '../services/settingServices';

/**
 * Controller for retrieving settings information.
 * @namespace InfoController
 */
const InfoController = {
  /**
   * Retrieves all settings.
   * @async
   * @function getSettings
   * @memberof InfoController
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {Promise<void>} - A promise that resolves with the settings information.
   */
  getSettings: async (req, res, next) => {
    try {
      const settings = await SettingService.getAllSettings();

      res.status(200).json(settings);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },
};

export default InfoController;
