// API /products 

const express = require('express');
const router = express.Router();

// Importar el controlador de usuarios
const PurchasesController = require('../../controllers/purchases.controller');

// Middleware para validar accesso
const AccessControl = require('../../middlewares/access.middleware');

router.get('/', AccessControl.authorizeRoles('ADMIN'), PurchasesController.getAllPurchases);

router.get('/vendor/:id', AccessControl.authorizeRoles('ADMIN', 'VENDOR'), AccessControl.checkIfTheSamePersonOrAdmin, PurchasesController.getAllPurchasesOfOneVendor);

router.get('/user/:id', AccessControl.checkIfTheSamePersonOrAdmin, PurchasesController.getAllPurchasesOfOneUser);

router.get('/:id', AccessControl.checkIfIsAuthorOrUserPurchase, PurchasesController.getPurchaseById);

router.post('/', PurchasesController.createPurchase);

module.exports = router;

