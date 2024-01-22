import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const DiscountService = {
  async getAllDiscounts() {
    return prisma.discount.findMany();
  },

  async getAllDiscountsByProduct(id) {
    return prisma.discount.findMany({
      where: {
        products: {
          some: {
            productId: Number(id),
          },
        },
      },
    });
  },

  async getDiscountById(id) {
    return prisma.discount.findUnique({
      where: { id: Number(id) },
      include: {
        product: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  },

  async getDiscountsByVendor(id) {
    return prisma.discount.findMany({
      where: {
        createdById: Number(id),
      },
    });
  },

  async createDiscount(discountData) {
    return prisma.discount.create({ data: discountData });
  },

  async deleteDiscount(id) {
    return prisma.discount.delete({ where: { id: Number(id) } });
  },

  async updateDiscount(id, discountData) {
    return prisma.discount.update({
      where: { id: Number(id) },
      data: discountData,
    });
  },

};

export default DiscountService;
