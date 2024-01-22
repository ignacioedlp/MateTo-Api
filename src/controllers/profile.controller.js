import jwt from 'jsonwebtoken';
import ProfileService from '../services/profileServices';
import SupabaseService from '../services/supabaseServices';
import logger from '../config/logger';

/**
 * Controller for handling profile-related operations.
 * @namespace ProfileController
 */
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

      if (req.files || req.files?.image) {
        // Tomo las images del body y las subo a supabase
        const { image } = req.files;

        imageProfile = await SupabaseService.uploadImageProfile(image, decoded.userId);
      }

      if (imageProfile) {
        const user = await ProfileService.updateProfile(decoded.userId, {
          ...req.body,
          imageProfile,
        });
        res.status(200).json(user);
      } else {
        const user = await ProfileService.updateProfile(decoded.userId, req.body);
        res.status(200).json(user);
      }
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },
};

export default ProfileController;
