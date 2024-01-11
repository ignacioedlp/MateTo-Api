import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const ProductTypeService = {
  async getAllProductTypes() {
    return await prisma.productType.findMany();
  },

  async getProductTypeById(id) {
    return await prisma.productType.findUnique({
      where: { id: Number(id) }
    });
  },

  async createProductType(productTypeData) {
    return await prisma.productType.create({ data: productTypeData });
  },

  async updateProductType(id, productTypeData) {
    return await prisma.productType.update({
      where: { id: Number(id) },
      data: productTypeData
    });
  },

  async deleteProductType(id) {
    return await prisma.productType.delete({
      where: { id: Number(id) }
    });
  }
};

export default ProductTypeService;