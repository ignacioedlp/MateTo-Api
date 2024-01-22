import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const OrderService = {

  getOrdersByVendor: async (vendorId) => {
    const orders = prisma.purchaseItem.findMany({
      where: {
        purchase: {
          status: 'COMPLETED',
        },
        product: {
          authorId: vendorId,
        },
      },
      include: {
        purchase: true,
        product: true,
      },
    });
    return orders;
  },

};

export default OrderService;
