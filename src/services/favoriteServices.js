import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const FavoriteService = {

  async getFavorites(id) {
    return prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        favoriteProducts: {
          include: {
            product: {
              select: {
                id: true,
                title: true,
                price: true,
                imageUrls: true,
              },
            },
          },
        },
      },
    });
  },

  async addToFavorites(cartData) {
    return prisma.favoriteProduct.create({ data: cartData });
  },

  async removeFromFavorites(cartData) {
    return prisma.favoriteProduct.delete({
      where: {
        userId_productId: {
          userId: cartData.userId,
          productId: cartData.productId,
        },
      },
    });
  },

};

export default FavoriteService;
