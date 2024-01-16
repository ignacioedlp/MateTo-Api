import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CartService = {

  async getCart(id) {
    return prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        cartItems: {
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

  async addToCart(cartData) {
    const item = prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId: cartData.userId,
          productId: cartData.productId,
        },
      },
    });

    if (item) {
      return prisma.cartItem.update({
        where: {
          userId_productId: {
            userId: cartData.userId,
            productId: cartData.productId,
          },
        },
        data: {
          quantity: cartData.quantity,
        },
      });
    }
    return prisma.cartItem.create({ data: cartData });
  },

  async removeFromCart(cartData) {
    return prisma.cartItem.delete({
      where: {
        userId_productId: {
          userId: cartData.userId,
          productId: cartData.productId,
        },
      },
    });
  },

  async emptyCart(userId) {
    return prisma.cartItem.deleteMany({
      where: {
        userId,
      },
    });
  },

};

export default CartService;
