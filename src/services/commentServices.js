import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CommentService = {

  async getAllComments() {
    return prisma.comment.findMany({

      include: {
        author: {
          select: {
            name: true,
            imageProfile: true,
            email: true,
            id: true,
          },
        },
        product: {
          select: {
            id: true,
          },
        },
      },

    });
  },

  async getCommentsOfOneProduct(id) {
    return prisma.comment.findMany({
      where: { productId: Number(id) },
      include: {
        author: {
          select: {
            name: true,
            imageProfile: true,
            email: true,
            id: true,
          },
        },
        product: {
          select: {
            id: true,
          },
        },
      },
    });
  },

  async createComment(commentData) {
    return prisma.comment.create({ data: commentData });
  },

  async deleteComment(id) {
    return prisma.comment.delete({ where: { id: Number(id) } });
  },
};

export default CommentService;
