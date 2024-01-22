import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ProductService = {
  async getAllProducts({
    priceMin,
    priceMax,
    stock,
    category,
    colors,
    sizes,
    type,
    vendor,
    recent,
    popular,
    published,
    page,
    pageSize,
  }) {
    const skip = page > 0 ? (page - 1) * pageSize : 0;
    const take = pageSize ? parseInt(pageSize, 10) : 10;

    const conditions = {
      ...(recent && { createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } }),
      ...(vendor && { authorId: Number(vendor) }),
      ...(priceMin && priceMax && {
        price: {
          gte: parseFloat(priceMin),
          lte: parseFloat(priceMax),
        },
      }),
      ...(stock && { stock: parseInt(stock, 10) }),
      ...(category && { categoryId: Number(category) }),
      ...(colors && {
        colors: {
          some: {
            id: {
              in: colors.map((color) => Number(color)),
            },

          },
        },
      }),
      ...(sizes && {
        sizes: {
          some: {
            id: {
              in: sizes.map((size) => Number(size)),
            },

          },
        },
      }),
      ...(type && { typeId: Number(type) }),
      ...(published && { published }),
      ...(popular && { purchaseItems: { some: { quantity: { gt: 10 } } } }),
    };

    const products = await prisma.product.findMany({
      where: conditions,
      include: {
        author: {
          select: {
            name: true,
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take,
    });

    const totalItems = prisma.product.count({
      where: conditions,
    });

    const totalPages = Math.ceil(totalItems / pageSize);

    return { products, totalPages };
  },

  async getProductById(id) {
    return prisma.product.findUnique({
      where: { id: Number(id) },
      include: {
        comments: {
          select: {
            text: true,
            author: {
              select: {
                name: true,
              },
            },
            createdAt: true,
          },
        },
        colors: {
          select: {
            name: true,
            hex: true,
          },
        },
        sizes: {
          select: {
            name: true,
          },
        },
        ratings: {
          select: {
            value: true,
          },
        },
        author: {
          select: {
            name: true,
            id: true,
          },
        },
        type: {
          select: {
            name: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
      },
    });
  },

  async createProduct(productData) {
    const { colors, sizes, ...otherData } = productData;

    const colorsToAdd = prisma.color.findMany({
      where: {
        id: {
          in: colors,
        },
      },
    });

    const sizesToAdd = prisma.size.findMany({
      where: {
        id: {
          in: sizes,
        },
      },
    });

    const productCreate = prisma.product.create({
      data: {
        ...otherData,
        colors: {
          connect: colorsToAdd.map((color) => ({ id: color.id })),
        },
        // Conectar tamaños existentes
        sizes: {
          connect: sizesToAdd.map((size) => ({ id: size.id })),
        },
      },
    });

    return productCreate;
  },

  async updateProduct(id, productData) {
    return prisma.product.update({
      where: { id: Number(id) },
      data: productData,
    });
  },

  async deleteProduct(id) {
    return prisma.product.delete({
      where: { id: Number(id) },
    });
  },

  async updateStock(id, stockToReduce) {
    return prisma.product.update({
      where: { id: Number(id) },
      data: {
        stock: {
          decrement: stockToReduce,
        },
      },
    });
  },
};

export default ProductService;
