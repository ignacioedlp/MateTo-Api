// API /profile
import { Router } from 'express';
const router = Router();

// Importar el controlador de usuarios
import FavoriteController from '../../controllers/favorite.controller';

router.get('/', FavoriteController.getFavorites);

router.get('/:id', FavoriteController.addToFavorites);

router.delete('/:id', FavoriteController.removeFromFavorites);

export default router;

