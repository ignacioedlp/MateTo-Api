import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ProductTypeService = {
  async getAllProductTypes() {
    return prisma.productType.findMany();
  },

  async getProductTypeById(id) {
    return prisma.productType.findUnique({
      where: { id: Number(id) },
    });
  },

  async createProductType(productTypeData) {
    return prisma.productType.create({ data: productTypeData });
  },

  async updateProductType(id, productTypeData) {
    return prisma.productType.update({
      where: { id: Number(id) },
      data: productTypeData,
    });
  },

  async deleteProductType(id) {
    return prisma.productType.delete({
      where: { id: Number(id) },
    });
  },
};

export default ProductTypeService;
