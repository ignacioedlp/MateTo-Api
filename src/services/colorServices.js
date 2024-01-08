const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ColorService = {
  async getAllColors() {
    return await prisma.color.findMany();
  },

  async getColorById(id) {
    return await prisma.color.findUnique({
      where: { id: Number(id) }
    });
  },

  async createColor(colorData) {
    return await prisma.color.create({ data: colorData });
  },

  async updateColor(id, ColorData) {
    return await prisma.color.update({
      where: { id: Number(id) },
      data: ColorData
    });
  },

  async deleteColor(id) {
    return await prisma.color.delete({
      where: { id: Number(id) }
    });
  }
};

module.exports = ColorService;