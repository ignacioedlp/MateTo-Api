import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const VendorService = {
  async getAllVendors({ limit }) {
    const roleVendor = await prisma.role.findUnique({
      where: { name: 'VENDOR' },
    });

    return prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        imageProfile: true,
        createdAt: true,
      },
      where: {
        roleId: roleVendor.id,
      },
      take: limit ? Number(limit) : undefined,
    });
  },

  async getVendorById(id) {
    const roleVendor = await prisma.role.findUnique({
      where: { name: 'VENDOR' },
    });

    return prisma.user.findUnique({
      select: {
        id: true,
        name: true,
        email: true,
        imageProfile: true,
      },
      where: {
        id: Number(id),
        roleId: roleVendor.id,
      },
    });
  },
};

export default VendorService;
