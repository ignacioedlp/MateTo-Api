const RoleService = require('../services/roleServices');
const logger = require('../config/logger');

const RolesController = {
  getAllRoles: async (req, res, next) => {
    try {
      const roles = await RoleService.getAllRoles();
      res.status(200).json(roles);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  getRoleById: async (req, res, next) => {
    try {
      const role = await RoleService.getRoleById(req.params.id);
      res.status(200).json(role);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  createRole: async (req, res, next) => {
    try {
      const createdRole = await RoleService.createRole(req.body);
      res.status(201).json(createdRole);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  updateRole: async (req, res, next) => {
    try {
      const updatedRole = await RoleService.updateRole(req.params.id, req.body);
      res.status(200).json(updatedRole);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  deleteRole: async (req, res, next) => {
    try {
      const deletedRole = await RoleService.deleteRole(req.params.id);
      res.status(200).json(deletedRole);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  }
};

module.exports = RolesController;