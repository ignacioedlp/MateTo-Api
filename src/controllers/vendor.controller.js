const VendorService = require('../services/vendorServices');
const logger = require('../config/logger');

const VendorsController = {
  getAllVendors: async (req, res, next) => {
    try {
      const vendors = await VendorService.getAllVendors(req.query);
      res.status(200).json(vendors);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },

  getVendorById: async (req, res, next) => {
    try {
      const vendor = await VendorService.getVendorById(req.params.id);
      res.status(200).json(vendor);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  },
};

module.exports = VendorsController;