import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


const CartService = {

  async getCart(id) {
    return await prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        cartItems: {
          include: {
            product: {
              select: {
                id: true,
                title: true,
                price: true,
                imageUrls: true
              }
            }
          }
        }
      }
    });
  },

  async addToCart(cartData) {
    //Si exite el item en mi carrito, actualizo la cantidad, sino lo agrego
    const item = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId: cartData.userId,
          productId: cartData.productId
        }
      }
    });

    if (item) {
      return await prisma.cartItem.update({
        where: {
          userId_productId: {
            userId: cartData.userId,
            productId: cartData.productId
          }
        },
        data: {
          quantity: cartData.quantity
        }
      });
    } else {
      return await prisma.cartItem.create({ data: cartData });
    }
  },

  async removeFromCart(cartData) {
    return await prisma.cartItem.delete({
      where: {
        userId_productId: {
          userId: cartData.userId,
          productId: cartData.productId
        }
      }
    });
  },

};

export default CartService;