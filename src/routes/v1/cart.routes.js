// API /profile
const express = require('express');
const router = express.Router();

// Importar el controlador de usuarios
const CartController = require('../../controllers/cart.controller');

router.get('/', CartController.getCart);

router.post('/', CartController.addToCart);

router.delete('/:id', CartController.removeFromCart);

module.exports = router;

