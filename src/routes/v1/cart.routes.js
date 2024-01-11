// API /profile
import { Router } from 'express';
const router = Router();

// Importar el controlador de usuarios
import CartController from '../../controllers/cart.controller';

router.get('/', CartController.getCart);

router.post('/', CartController.addToCart);

router.delete('/:id', CartController.removeFromCart);

export default router;

