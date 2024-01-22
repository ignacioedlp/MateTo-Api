import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PurchaseService = {
  async getAllPurchases() {
    return prisma.purchase.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  },

  async getAllPurchasesOfOneVendor(id) {
    return prisma.purchase.findMany({
      where: {
        purchaseItems: {
          some: {
            product: {
              authorId: Number(id),
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  },

  async getAllPurchasesOfOneUser(id) {
    return prisma.purchase.findMany({
      where: { userId: Number(id) },
      include: {
        purchaseItems: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  },

  async getPurchaseById(id) {
    return prisma.purchase.findUnique({
      where: { id: Number(id) },
    });
  },

  async createPurchase(purchaseData) {
    const createdPurchase = await prisma.purchase.create({
      data: {
        userId: purchaseData.userId,
        totalDiscount: purchaseData.totalDiscount,
        addressLine: purchaseData.addressLine,
        city: purchaseData.city,
        state: purchaseData.state,
        postalCode: purchaseData.postalCode,
        phoneNumber: purchaseData.phoneNumber,
        purchaseItems: {
          create: purchaseData.purchaseItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        purchaseItems: true,
      },
    });

    return createdPurchase;
  },

  async updatePurchase(id, purchaseData) {
    return prisma.purchase.update({
      where: { id: Number(id) },
      data: purchaseData,
    });
  },

};

export default PurchaseService;
