import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const RoleService = {
  async getAllRoles() {
    return await prisma.role.findMany();
  },

  async getRoleById(id) {
    return await prisma.role.findUnique({
      where: { id: Number(id) }
    });
  },

  async createRole(roleData) {
    return await prisma.role.create({ data: roleData });
  },

  async updateRole(id, roleData) {
    return await prisma.role.update({
      where: { id: Number(id) },
      data: roleData
    });
  },

  async deleteRole(id) {
    return await prisma.role.delete({
      where: { id: Number(id) }
    });
  }
};

export default RoleService;