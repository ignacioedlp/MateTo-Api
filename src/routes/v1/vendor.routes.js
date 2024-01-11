import { Router } from 'express';
const router = Router();

// Importar el controlador de usuarios
import VendorsController from '../../controllers/vendor.controller';

// GET request para obtener la lista de todos los usuarios
router.get('/', VendorsController.getAllVendors);

// GET request para obtener un usuario específico por ID
router.get('/:id', VendorsController.getVendorById);

export default router;