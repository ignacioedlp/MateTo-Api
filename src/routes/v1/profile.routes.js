// API /profile
import { Router } from 'express';
const router = Router();

// Importar el controlador de usuarios
import ProfileController from '../../controllers/profile.controller';

router.get('/', ProfileController.getProfile);

router.put('/', ProfileController.updateProfile);

export default router;

