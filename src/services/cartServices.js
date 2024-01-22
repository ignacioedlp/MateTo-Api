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
    return prisma.cartItem.upsert({
      where: {
        userId_productId: {
          userId: cartData.userId,
          productId: cartData.productId,
        },
      },
      update: {
        quantity: cartData.quantity,
      },
      create: {
        quantity: cartData.quantity,
        userId: cartData.userId,
        productId: cartData.productId,
      },
    });
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
