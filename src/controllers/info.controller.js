import jwt from 'jsonwebtoken';
import logger from '../config/logger';
import SettingService from '../services/settingServices';


const InfoController = {

  getSettings: async (req, res, next) => {
    try {
      
      const settings = await SettingService.getAllSettings();

      res.status(200).json(settings);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  }
};

export default InfoController;