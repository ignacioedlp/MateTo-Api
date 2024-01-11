import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// model Discount {
//   id          Int               @id @default(autoincrement())
//   title       String
//   percentage  Float
//   validFrom   DateTime
//   validUntil  DateTime
//   createdBy   User              @relation(fields: [createdById], references: [id])
//   createdById Int
//   products    AppliedDiscount[]
// }

// model AppliedDiscount {
//   id         Int      @id @default(autoincrement())
//   productId  Int
//   discountId Int
//   product    Product  @relation(fields: [productId], references: [id])
//   discount   Discount @relation(fields: [discountId], references: [id])

//   @@unique([productId, discountId])
// }

const DiscountService = {
  async getAllDiscounts() {
    return await prisma.discount.findMany();
  },

  async getAllDiscountsByProduct(id) {
    return await prisma.discount.findMany({
      where: {
        products: {
          some: {
            productId: Number(id)
          }
        }
      }
    });
  },

  async getDiscountById(id) {
    return await prisma.discount.findUnique({
      where: { id: Number(id) },
      include: {
        product: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    });
  },

  async getDiscountsByVendor(id) {
    return await prisma.discount.findMany({
      where: {
        createdById: Number(id)
      }
    });
  },

  async createDiscount(discountData) {
    return await prisma.discount.create({ data: discountData });
  },

  async deleteDiscount(id) {
    return await prisma.discount.delete({ where: { id: Number(id) } });
  },

  async updateDiscount(id, discountData) {
    return await prisma.discount.update({
      where: { id: Number(id) },
      data: discountData
    });
  }

};

export default DiscountService;