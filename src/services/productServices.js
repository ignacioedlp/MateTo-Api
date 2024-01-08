const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ProductService = {
  async getAllProducts({ priceMin, priceMax, stock, category, colors, sizes, type, vendor, recent, popular, limit, published }) {
    return await prisma.product.findMany({
      where: {
        ...(recent && { createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } }),
        ...(vendor && { authorId: Number(vendor) }),
        ...(priceMin && priceMax && {
          price: {
            gte: parseFloat(priceMin),
            lte: parseFloat(priceMax)
          }
        }),
        ...(stock && { stock: parseInt(stock) }),
        ...(category && { categoryId: Number(category) }),
        ...(colors && {
          colors: {
            some: {
              id: {
                in: colors.map(color => Number(color))
              }

            }
          }
        }),
        ...(sizes && {
          sizes: {
            some: {
              id: {
                in: sizes.map(size => Number(size))
              }

            }
          }
        }),
        ...(type && { typeId: Number(type) }),
        ...(published && { published: published }),
        ...(popular && { purchaseItems: { some: { quantity: { gt: 10 } } } })
      },
      include: {
        author: {
          select: {
            name: true,
            id: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: limit ? parseInt(limit) : undefined
    });
  },

  async getProductById(id) {
    return await prisma.product.findUnique({
      where: { id: Number(id) },
      include: {
        comments: {
          select: {
            text: true,
            author: {
              select: {
                name: true,
              }
            }
          }
        },
        colors: {
          select: {
            name: true,
            hex: true,
          }
        },
        sizes: {
          select: {
            name: true,
          }
        },
        ratings: {
          select: {
            value: true,
          }
        },
        author: {
          select: {
            name: true,
            id: true
          }
        },
        type: {
          select: {
            name: true,
          }
        },
        category: {
          select: {
            name: true,
          }
        }
      }
    });
  },

  async createProduct(productData) {
    const { colors, sizes, ...otherData } = productData;

    const colorsToAdd = await prisma.color.findMany({
      where: {
        id: {
          in: colors
        }
      }
    });

    const sizesToAdd = await prisma.size.findMany({
      where: {
        id: {
          in: sizes
        }
      }
    });


    const productCreate = await prisma.product.create({
      data: {
        ...otherData,
        colors: {
          connect: colorsToAdd.map(color => ({ id: color.id })),
        },
        // Conectar tamaños existentes
        sizes: {
          connect: sizesToAdd.map(size => ({ id: size.id })),
        },
      }
    });

    return productCreate;
  },

  async updateProduct(id, productData) {
    return await prisma.product.update({
      where: { id: Number(id) },
      data: productData
    });
  },

  async deleteProduct(id) {
    return await prisma.product.delete({
      where: { id: Number(id) }
    });
  }
};

module.exports = ProductService;