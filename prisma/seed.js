const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * Executes the main function to seed the database with initial data.
 * @return {Promise<void>} A promise that resolves when the seeding is complete.
 */
async function main() {
  // Restore
  await prisma.color.deleteMany();
  await prisma.size.deleteMany();
  await prisma.productCategory.deleteMany();
  await prisma.productType.deleteMany();
  await prisma.role.deleteMany();

  // Roles
  const roles = ['USER', 'ADMIN', 'VENDOR'];
  roles.forEach(async (role) => {
    await prisma.role.create({ data: { name: role } });
  });

  // ProductTypes
  const productTypes = ['MATE', 'YERBERO', 'MATERA', 'BOMBILLA', 'TERMOS'];

  productTypes.forEach(async (type) => {
    await prisma.productType.create({ data: { name: type } });
  });

  // ProductCategories
  const productCategories = ['CAMIONERO', 'TORPEDO', 'IMPERIAL', 'METALICOS', 'PLASTICOS'];

  productCategories.forEach(async (category) => {
    await prisma.productCategory.create({ data: { name: category } });
  });

  // Colors
  const colorData = [
    { name: 'PURPLE', hex: '#9F7AEA' },
    { name: 'BLACK', hex: '#4A4A4A' },
    { name: 'WHITE', hex: '#F7FAFC' },
    { name: 'BLUE', hex: '#63B3ED' },
    { name: 'YELLOW', hex: '#F6E05E' },
    { name: 'DARK_BROWN', hex: '#A08770' },
    { name: 'LIGHT_BROWN', hex: '#CABAA6' },
    { name: 'GRAY', hex: '#A0AEC0' },
    { name: 'PINK', hex: '#F687B3' },
    { name: 'TURQUOISE', hex: '#4FD1C5' },
  ];

  colorData.forEach(async ({ name }) => {
    await prisma.color.create({ data: { name } });
  });

  // Sizes
  const sizes = ['S', 'M', 'L', 'XXL'];

  sizes.forEach(async (size) => {
    await prisma.size.create({ data: { name: size } });
  });
}

main()
  .catch(() => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
