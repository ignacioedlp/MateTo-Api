import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const AnalyticService = {

  async getTotalItemsSales(vendor) {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const purchases = await prisma.purchase.findMany({
      where: {
        createdAt: {
          gte: sevenDaysAgo,
          lte: today,
        },
        purchaseItems: {
          some: {
            product: {
              authorId: Number(vendor),
            },
          },
        },
      },
      include: {
        purchaseItems: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    const totalsByDay = {};

    purchases.forEach((purchase) => {
      const date = purchase.createdAt.toISOString().split('T')[0];
      const total = purchase.purchaseItems.reduce((acc, item) => acc + item.product.price, 0);
      const quantity = purchase.purchaseItems.length;

      if (totalsByDay[date]) {
        totalsByDay[date].total += total;
        totalsByDay[date].quantity += quantity;
      } else {
        totalsByDay[date] = { day: date, total, quantity };
      }
    });

    for (let i = 0; i < 7; i += 1) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      if (!totalsByDay[dateString]) {
        totalsByDay[dateString] = { day: dateString, total: 0, quantity: 0 };
      }
    }

    const sortedTotalsByDay = Object.values(totalsByDay).sort((a, b) => {
      const dateA = new Date(a.day);
      const dateB = new Date(b.day);
      return dateA - dateB;
    });

    return sortedTotalsByDay;
  },

  async getTopFiveProducts(vendor) {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const purchases = await prisma.purchase.findMany({
      where: {
        createdAt: {
          gte: sevenDaysAgo,
          lte: today,
        },
        purchaseItems: {
          some: {
            product: {
              authorId: Number(vendor),
            },
          },
        },
      },
      include: {
        purchaseItems: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    const totalsByProduct = {};

    purchases.forEach((purchase) => {
      purchase.purchaseItems.forEach((item) => {
        const { product } = item;
        if (totalsByProduct[product.id]) {
          totalsByProduct[product.id].total += product.price;
          totalsByProduct[product.id].quantity += item.quantity;
        } else {
          totalsByProduct[product.id] = { product, total: product.price, quantity: 1 };
        }
      });
    });

    const sortedTotalsByProduct = Object.values(totalsByProduct).sort((a, b) => b.total - a.total);

    return sortedTotalsByProduct.slice(0, 5);
  },

};

export default AnalyticService;
