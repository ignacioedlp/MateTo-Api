import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ColorService = {
  async getAllColors() {
    return prisma.color.findMany();
  },

  async getColorById(id) {
    return prisma.color.findUnique({
      where: { id: Number(id) },
    });
  },

  async createColor(colorData) {
    return prisma.color.create({ data: colorData });
  },

  async updateColor(id, ColorData) {
    return prisma.color.update({
      where: { id: Number(id) },
      data: ColorData,
    });
  },

  async deleteColor(id) {
    return prisma.color.delete({
      where: { id: Number(id) },
    });
  },
};

export default ColorService;
