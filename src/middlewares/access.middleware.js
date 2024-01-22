import jwt from 'jsonwebtoken';
import ProductService from '../services/productServices';
import PurchaseService from '../services/purchaseServices';

/**
 * AccessControl object containing middleware functions for access control.
 * @typedef {Object} AccessControl
 * @property {Function} checkIfIsTheSameVendorOrAdminProduct - Middleware function to check
 * if the user is the same vendor or an admin for a product.
 * @property {Function} checkIfTheSamePersonOrAdmin - Middleware function to check if
 * the user is the same person or an admin.
 * @property {Function} authorizeRoles - Middleware function to authorize specific roles.
 * @property {Function} checkTokenValidation - Middleware function to check the validity of a token.
 * @property {Function} checkIfIsAuthorOrUserPurchase - Middleware function to check if the user
 * is the author or the purchaser of a purchase.
 */
const AccessControl = {
  checkIfIsTheSameVendorOrAdminProduct: () => async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET);

      if (decoded.role === 'ADMIN') {
        return next();
      }
      const product = await ProductService.getProductById(req.params.id);

      if (product.authorId === decoded.userId) {
        return next();
      }
      return res.status(403).json({ message: 'Forbidden - You don\'t have permission to access this resource' });
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  },

  checkIfTheSamePersonOrAdmin: () => async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET);

      if (decoded.role === 'ADMIN') {
        return next();
      } if (req.params.id === decoded.userId) {
        return next();
      }
      return res.status(403).json({ message: 'Forbidden - You don\'t have permission to access this resource' });
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  },

  authorizeRoles: (...roles) => (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET);

      if (roles.includes(decoded.role)) {
        return next();
      }
      return res.status(403).json({ message: 'Forbidden - You don\'t have permission to access this resource' });
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  },

  checkTokenValidation: (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      jwt.verify(token, process.env.SECRET);
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  },

  checkIfIsAuthorOrUserPurchase: async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET);

      if (decoded.role === 'ADMIN') {
        return next();
      }
      const purchase = await PurchaseService.getPurchaseById(req.params.id);

      if (purchase.userId === decoded.userId) {
        return next();
      }
      return res.status(403).json({ message: 'Forbidden - You don\'t have permission to access this resource' });
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  },

};

export default AccessControl;
