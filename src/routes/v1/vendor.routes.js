import { Router } from 'express';

import VendorsController from '../../controllers/vendor.controller';

const router = Router();

router.get('/', VendorsController.getAllVendors);

router.get('/:id', VendorsController.getVendorById);

export default router;
