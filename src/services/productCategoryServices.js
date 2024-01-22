import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ProductCategoryService = {
  async getAllProductCategories() {
    return prisma.productCategory.findMany();
  },

  async getProductCategoryById(id) {
    return prisma.productCategory.findUnique({
      where: { id: Number(id) },
    });
  },

  async createProductCategory(productCategoryData) {
    return prisma.productCategory.create({ data: productCategoryData });
  },

  async updateProductCategory(id, productCategoryData) {
    return prisma.productCategory.update({
      where: { id: Number(id) },
      data: productCategoryData,
    });
  },

  async deleteProductCategory(id) {
    return prisma.productCategory.delete({
      where: { id: Number(id) },
    });
  },
};

export default ProductCategoryService;
