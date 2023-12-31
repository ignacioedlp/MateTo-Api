const jwt = require('jsonwebtoken');
const ProductService = require('../services/productServices');
const PurchaseService = require('../services/purchaseServices');

const AccessControl = {
  checkIfIsTheSameVendorOrAdminProduct: () => async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET);

      if (decoded.role === 'ADMIN') {
        next();
      } else {
        const product = await ProductService.getProductById(req.params.id);

        if (product.authorId === decoded.userId) {
          next();
        } else {
          return res.status(403).json({ message: "Forbidden - You don't have permission to access this resource" });
        }
      }
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  },

  checkIfTheSamePersonOrAdmin: () => async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET);

      if (decoded.role === 'ADMIN') {
        next();
      } else {
        if (req.params.id === decoded.userId) {
          next();
        } else {
          return res.status(403).json({ message: "Forbidden - You don't have permission to access this resource" });
        }
      }
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  },

  authorizeRoles: (...roles) => (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET);

      if (roles.includes(decoded.role)) {
        next();
      } else {
        return res.status(403).json({ message: "Forbidden - You don't have permission to access this resource" });
      }
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  },

  checkTokenValidation: (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    try {
      jwt.verify(token, process.env.SECRET);
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  },

  checkIfIsAuthorOrUserPurchase: async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET);

      if (decoded.role === 'ADMIN') {
        next();
      } else {
        const purchase = await PurchaseService.getPurchaseById(req.params.id);

        if (purchase.userId === decoded.userId) {
          next();
        } else {
          return res.status(403).json({ message: "Forbidden - You don't have permission to access this resource" });
        }
      }
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  }

}

module.exports = AccessControl;