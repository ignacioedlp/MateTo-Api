const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Restore
  await prisma.color.deleteMany();
  await prisma.size.deleteMany();
  await prisma.productCategory.deleteMany();
  await prisma.productType.deleteMany();
  await prisma.role.deleteMany();

  // Roles
  const roles = ['USER', 'ADMIN', 'VENDOR'];
  for (const name of roles) {
    await prisma.role.create({ data: { name } });
  }

  // ProductTypes
  const productTypes = ['MATE', 'YERBERO', 'MATERA', 'BOMBILLA', 'TERMOS'];
  for (const name of productTypes) {
    await prisma.productType.create({ data: { name } });
  }

  // ProductCategories
  const productCategories = ['CAMIONERO', 'TORPEDO', 'IMPERIAL', 'METALICOS', 'PLASTICOS'];
  for (const name of productCategories) {
    await prisma.productCategory.create({ data: { name } });
  }

  // Colors
  const colorData = [
    { name: 'PURPLE', hex: '#9F7AEA' },       // Tailwind Purple 400
    { name: 'BLACK', hex: '#4A4A4A' },        // Un gris oscuro en lugar de negro puro
    { name: 'WHITE', hex: '#F7FAFC' },        // Un blanco suave
    { name: 'BLUE', hex: '#63B3ED' },         // Tailwind Blue 400
    { name: 'YELLOW', hex: '#F6E05E' },       // Tailwind Yellow 400
    { name: 'DARK_BROWN', hex: '#A08770' },   // Un marrón medio
    { name: 'LIGHT_BROWN', hex: '#CABAA6' },  // Un marrón claro
    { name: 'GRAY', hex: '#A0AEC0' },         // Tailwind Gray 400
    { name: 'PINK', hex: '#F687B3' },         // Tailwind Pink 400
    { name: 'TURQUOISE', hex: '#4FD1C5' }     // Tailwind Teal 400
  ];

  for (const { name, hex } of colorData) {
    await prisma.color.create({ data: { name, hex } });
  }

  // Sizes
  const sizes = ['S', 'M', 'L', 'XXL'];
  for (const name of sizes) {
    await prisma.size.create({ data: { name } });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
