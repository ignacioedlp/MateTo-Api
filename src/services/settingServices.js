const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const SettingService = {
  async getAllSettings() {

    const settings = {
      colors: await prisma.color.findMany(
        {
          select: {
            id: true,
            name: true,
            hex: true
          },
          where: {
            enabled: true,
          },
          orderBy: {
            name: 'asc'
          }
        }
      ),
      productCategories: await prisma.productCategory.findMany(
        {
          select: {
            id: true,
            name: true
          },
          where: {
            enabled: true,
          },
          orderBy: {
            name: 'asc'
          }
        }
      ),
      productTypes: await prisma.productType.findMany(
        {
          select: {
            id: true,
            name: true
          },
          where: {
            enabled: true,
          },
          orderBy: {
            name: 'asc'
          }
        }
      ),
      sizes: await prisma.size.findMany(
        {
          select: {
            id: true,
            name: true
          },
          where: {
            enabled: true,
          },
          orderBy: {
            name: 'asc'
          }
        }
      ),
    };

    return settings;
  }
};

module.exports = SettingService;