import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const UserService = {
  async getAllUsers() {
    const roleUser = await prisma.role.findUnique({
      where: { name: 'USER' },
    });

    return prisma.user.findMany(
      {
        select: {
          id: true,
          username: true,
          email: true,
          imageProfile: true,
          createdAt: true,
          purchases: {
            select: {
              id: true,
            },
          },
        },
        where: {
          roleId: roleUser.id,
        },
      },
    );
  },

  async getUserById(id) {
    return prisma.user.findUnique({
      where: { id: Number(id) },
    });
  },

  async getUserByEmail(email) {
    return prisma.user.findFirst({
      where: { email },
    });
  },

  async updateUser(id, userData) {
    return prisma.user.update({
      where: { id: Number(id) },
      data: userData,
    });
  },

  async deleteUser(id) {
    return prisma.user.delete({
      where: { id: Number(id) },
    });
  },
};

export default UserService;
