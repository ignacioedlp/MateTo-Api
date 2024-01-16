import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SizeService = {
  async getAllSizes() {
    return prisma.size.findMany();
  },

  async getSizeById(id) {
    return prisma.size.findUnique({
      where: { id: Number(id) },
    });
  },

  async createSize(sizeData) {
    return prisma.size.create({ data: sizeData });
  },

  async updateSize(id, sizeData) {
    return prisma.size.update({
      where: { id: Number(id) },
      data: sizeData,
    });
  },

  async deleteSize(id) {
    return prisma.size.delete({
      where: { id: Number(id) },
    });
  },
};

export default SizeService;
