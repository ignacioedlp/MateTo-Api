const UserService = require('../services/userServices');

const ProfileController = {
  getProfile: async (req, res, next) => {
    try {
      const user = await UserService.getUserById(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = ProfileController;