const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const SizeService = {
  async getAllSizes() {
    return await prisma.size.findMany();
  },

  async getSizeById(id) {
    return await prisma.size.findUnique({
      where: { id: Number(id) }
    });
  },

  async createSize(sizeData) {
    return await prisma.size.create({ data: sizeData });
  },

  async updateSize(id, sizeData) {
    return await prisma.size.update({
      where: { id: Number(id) },
      data: sizeData
    });
  },

  async deleteSize(id) {
    return await prisma.size.delete({
      where: { id: Number(id) }
    });
  }
};

module.exports = SizeService;