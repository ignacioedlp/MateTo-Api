import { Router } from 'express';
import DiscountController from '../../controllers/discount.controller';
import AccessControl from '../../middlewares/access.middleware';
const router = Router();

// Get all discounts
router.get('/', AccessControl.authorizeRoles('ADMIN'), DiscountController.getAllDiscounts);

// Get all discounts by product
router.get('/product/:id', DiscountController.getAllDiscountsByProduct);

// Get all discounts by vendor
router.get('/vendor', AccessControl.authorizeRoles('ADMIN', 'VENDOR'), DiscountController.getDiscountsByVendor);

// Get one discount by ID
router.get('/:id', DiscountController.getDiscountById);

// Create Discount
router.post('/', AccessControl.authorizeRoles('ADMIN', 'VENDOR'), DiscountController.createDiscount);

// Update Discount
router.put('/:id', AccessControl.authorizeRoles('ADMIN', 'VENDOR'), DiscountController.updateDiscount);

// Delete Discount
router.delete('/:id', AccessControl.authorizeRoles('ADMIN', 'VENDOR'), DiscountController.deleteDiscount);


export default router;