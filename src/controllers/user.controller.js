import UserService from '../services/userServices';
import logger from '../config/logger';

/**
 * Controller for handling user-related operations.
 *
 * @namespace UsersController
 */
const UsersController = {
  getAllUsers: async (req, res, next) => {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  getUserById: async (req, res, next) => {
    try {
      const user = await UserService.getUserById(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  createUser: async (req, res, next) => {
    try {
      const createdUser = await UserService.createUser(req.body);
      res.status(201).json(createdUser);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const updatedUser = await UserService.updateUser(req.params.id, req.body);
      res.status(200).json(updatedUser);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const deletedUser = await UserService.deleteUser(req.params.id);
      res.status(200).json(deletedUser);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },
};

export default UsersController;
