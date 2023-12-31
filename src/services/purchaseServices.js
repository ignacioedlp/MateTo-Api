const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const PurchaseService = {
  async getAllPurchases() {
    return await prisma.purchase.findMany();
  },

  async getAllPurchasesOfOneVendor(id) {
    return await prisma.purchase.findMany({
      where: { vendorId: Number(id) },
      orderBy: {
        createdAt: 'desc'
      }
    });
  },

  async getAllPurchasesOfOneUser(id) {
    return await prisma.purchase.findMany({
      where: { userId: Number(id) },
      orderBy: {
        createdAt: 'desc'
      }
    });
  },

  async getPurchaseById(id) {
    return await prisma.purchase.findUnique({
      where: { id: Number(id) }
    });
  },

  async createPurchase(purchaseData) {
    return await prisma.purchase.create({ data: purchaseData });
  },

};

module.exports = PurchaseService;