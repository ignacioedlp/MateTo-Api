// API /profile
const express = require('express');
const router = express.Router();

// Importar el controlador de usuarios
const FavoriteController = require('../../controllers/favorite.controller');

router.get('/', FavoriteController.getFavorites);

router.get('/:id', FavoriteController.addToFavorites);

router.delete('/:id', FavoriteController.removeFromFavorites);

module.exports = router;

