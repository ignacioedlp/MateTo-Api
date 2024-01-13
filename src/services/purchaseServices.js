import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// model Purchase {
//   id            Int            @id @default(autoincrement())
//   createdAt     DateTime       @default(now())
//   userId        Int
//   user          User           @relation(fields: [userId], references: [id])
//   purchaseItems PurchaseItem[]
//   totalDiscount Float
//   addressLine   String
//   city          String
//   state         String
//   postalCode    String
//   phoneNumber   String
// }

// model PurchaseItem {
//   id         Int      @id @default(autoincrement())
//   purchaseId Int
//   productId  Int
//   quantity   Int
//   purchase   Purchase @relation(fields: [purchaseId], references: [id])
//   product    Product  @relation(fields: [productId], references: [id])
// }

const PurchaseService = {
  async getAllPurchases() {
    return await prisma.purchase.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
  },

  async getAllPurchasesOfOneVendor(id) {
    //Retorno todos los productos del vendedor donde apareza en una compra
    return await prisma.purchase.findMany({
      where: {
        purchaseItems: {
          some: {
            product: {
              authorId: Number(id)
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });


  },

  async getAllPurchasesOfOneUser(id) {
    return await prisma.purchase.findMany({
      where: { userId: Number(id) },
      include: {
        purchaseItems: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  },

  async getPurchaseById(id) {
    return await prisma.purchase.findUnique({
      where: { id: Number(id) }
    });
  },

  async createPurchase(purchaseData) {
    try {
      const createdPurchase = await prisma.purchase.create({
        data: {
          userId: purchaseData.userId,
          totalDiscount: purchaseData.totalDiscount,
          addressLine: purchaseData.addressLine,
          city: purchaseData.city,
          state: purchaseData.state,
          postalCode: purchaseData.postalCode,
          phoneNumber: purchaseData.phoneNumber,
          purchaseItems: {
            create: purchaseData.purchaseItems.map(item => ({
              productId: item.productId,
              quantity: item.quantity
            }))
          }
        },
        include: {
          purchaseItems: true // To include purchase items in the response
        }
      });

      return createdPurchase;
    } catch (error) {
      throw error; // Handle or throw the error as per your application's error handling policy
    }
  },

  async updatePurchase(id, purchaseData) {
    return await prisma.purchase.update({
      where: { id: Number(id) },
      data: purchaseData
    });
  },

};

export default PurchaseService;