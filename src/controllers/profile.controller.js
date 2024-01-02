const ProfileService = require('../services/profileServices');
const SupabaseService = require('../services/supabaseServices');
const jwt = require('jsonwebtoken');
const logger = require('../config/logger');

const ProfileController = {
  getProfile: async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      const decoded = jwt.verify(token, process.env.SECRET);

      const user = await ProfileService.getProfile(decoded.userId);
      res.status(200).json(user);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  updateProfile: async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      const decoded = jwt.verify(token, process.env.SECRET);

      let imageProfile = null;

      if (req.files || req.files.image) {
        // Tomo las images del body y las subo a supabase
        const image = req.files.image;

        imageProfile = await SupabaseService.uploadImageProfile(image, decoded.userId);
      }

      const user = await ProfileService.updateProfile(decoded.userId, {
        ...req.body,
        imageProfile,
      });
      res.status(200).json(user);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },
};

module.exports = ProfileController;