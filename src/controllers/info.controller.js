const jwt = require('jsonwebtoken');
const logger = require('../config/logger');
const SettingService = require('../services/settingServices');


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

module.exports = InfoController;