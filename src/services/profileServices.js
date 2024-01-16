import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ProfileService = {
  async getProfile(id) {
    return prisma.user.findUnique({
      where: { id: Number(id) },
    });
  },

  async updateProfile(id, userData) {
    return prisma.user.update({
      where: { id: Number(id) },
      data: userData,
    });
  },
};

export default ProfileService;
