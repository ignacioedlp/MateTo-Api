const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ProductService = {
  async getAllProducts() {
    return await prisma.product.findMany();
  },

  async getAllProductsForVendor(id) {
    return await prisma.product.findMany({
      where: { authorId: Number(id) }
    });
  },

  async getProductById(id) {
    return await prisma.product.findUnique({
      where: { id: Number(id) }
    });
  },

  async createProduct(productData) {
    return await prisma.product.create({ data: productData });
  },

  async updateProduct(id, productData) {
    return await prisma.product.update({
      where: { id: Number(id) },
      data: productData
    });
  },

  async deleteProduct(id) {
    return await prisma.product.delete({
      where: { id: Number(id) }
    });
  }
};

module.exports = ProductService;