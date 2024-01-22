import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const RoleService = {
  async getAllRoles() {
    return prisma.role.findMany();
  },

  async getRoleById(id) {
    return prisma.role.findUnique({
      where: { id: Number(id) },
    });
  },

  async createRole(roleData) {
    return prisma.role.create({ data: roleData });
  },

  async updateRole(id, roleData) {
    return prisma.role.update({
      where: { id: Number(id) },
      data: roleData,
    });
  },

  async deleteRole(id) {
    return prisma.role.delete({
      where: { id: Number(id) },
    });
  },
};

export default RoleService;
