import { Router } from 'express';
import UsersController from '../../controllers/user.controller';
import AccessControl from '../../middlewares/access.middleware';

const router = Router();

router.get('/', AccessControl.authorizeRoles('ADMIN'), UsersController.getAllUsers);

router.get('/:id', AccessControl.authorizeRoles('ADMIN'), UsersController.getUserById);

router.put('/:id', AccessControl.authorizeRoles('ADMIN'), UsersController.updateUser);

router.delete('/:id', AccessControl.authorizeRoles('ADMIN'), UsersController.deleteUser);

export default router;
