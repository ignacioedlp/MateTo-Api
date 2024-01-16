import VendorService from '../services/vendorServices';
import logger from '../config/logger';

/**
 * Controller for handling vendor-related operations.
 * @namespace VendorsController
 */
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

export default VendorsController;
