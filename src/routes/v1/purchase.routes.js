// API /products 

import { Router } from 'express';
const router = Router();

// Importar el controlador de usuarios
import PurchasesController from '../../controllers/purchase.controller';

// Middleware para validar accesso
import AccessControl from '../../middlewares/access.middleware';


router.get('/', AccessControl.authorizeRoles('ADMIN'), PurchasesController.getAllPurchases);

router.get('/vendor/:id', AccessControl.authorizeRoles('ADMIN', 'VENDOR'), PurchasesController.getAllProductsPurchasesOfOneVendor);

router.get('/user', PurchasesController.getAllPurchasesOfOneUser);

router.get('/:id', AccessControl.checkIfIsAuthorOrUserPurchase, PurchasesController.getPurchaseById);

router.post('/', PurchasesController.createPurchase);

export default router;

