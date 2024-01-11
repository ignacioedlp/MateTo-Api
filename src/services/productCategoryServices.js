import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const ProductCategoryService = {
  async getAllProductCategories() {
    return await prisma.productCategory.findMany();
  },

  async getProductCategoryById(id) {
    return await prisma.productCategory.findUnique({
      where: { id: Number(id) }
    });
  },

  async createProductCategory(productCategoryData) {
    return await prisma.productCategory.create({ data: productCategoryData });
  },

  async updateProductCategory(id, productCategoryData) {
    return await prisma.productCategory.update({
      where: { id: Number(id) },
      data: productCategoryData
    });
  },

  async deleteProductCategory(id) {
    return await prisma.productCategory.delete({
      where: { id: Number(id) }
    });
  }
};

export default ProductCategoryService;