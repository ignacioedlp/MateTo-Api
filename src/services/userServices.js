import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const UserService = {
  async getAllUsers() {
    return await prisma.user.findMany();
  },

  async getUserById(id) {
    return await prisma.user.findUnique({
      where: { id: Number(id) }
    });
  },

  async getUserByEmail(email) {
    return await prisma.user.findFirst({
      where: { email: email }
    });
  },

  // async createUser(userData) {
  //   return await prisma.user.create({ data: userData });
  // },

  async updateUser(id, userData) {
    return await prisma.user.update({
      where: { id: Number(id) },
      data: userData
    });
  },

  async deleteUser(id) {
    return await prisma.user.delete({
      where: { id: Number(id) }
    });
  }
};

export default UserService;