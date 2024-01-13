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
//   status        StatusPurchase @default(PENDING)
// }

// model PurchaseItem {
//   id         Int      @id @default(autoincrement())
//   purchaseId Int
//   productId  Int
//   quantity   Int
//   purchase   Purchase @relation(fields: [purchaseId], references: [id])
//   product    Product  @relation(fields: [productId], references: [id])
// }

// model Product {
//   id            Int               @id @default(autoincrement())
//   createdAt     DateTime          @default(now())
//   updatedAt     DateTime          @updatedAt
//   published     Boolean           @default(false)
//   title         String            @db.VarChar(255)
//   description   String            @db.VarChar(255)
//   price         Float
//   stock         Int
//   author        User?             @relation(fields: [authorId], references: [id])
//   authorId      Int?
//   cartItems     CartItem[]
//   favorites     FavoriteProduct[]
//   discounts     AppliedDiscount[]
//   comments      Comment[]
//   ratings       Rating[]
//   imageUrls     String[]
//   purchaseItems PurchaseItem[]
//   typeId        Int
//   categoryId    Int
//   type          ProductType       @relation(fields: [typeId], references: [id])
//   category      ProductCategory   @relation(fields: [categoryId], references: [id])
//   colors        Color[]           @relation("ProductColors")
//   sizes         Size[]            @relation("ProductSizes")
// }


const OrderService = {

  // Obtener los PurchaseItem de un vendor que estan en compras donde el status es COMPLETED

  getOrdersByVendor: async (vendorId) => {
    const orders = await prisma.purchaseItem.findMany({
      where: {
        purchase: {
          status: "COMPLETED"
        },
        product: {
          authorId: vendorId
        }
      },
      include: {
        purchase: true,
        product: true
      }
    })
    return orders
  },


}


export default OrderService;