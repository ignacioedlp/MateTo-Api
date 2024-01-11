import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const RatingService = {
  async createRating(ratingData) {
    return await prisma.rating.create({ data: ratingData });
  },

  async updateRating(id, rating) {
    return await prisma.rating.update({
      where: { id: Number(id) },
      data: { value: Number(rating) }
    });
  },

  async deleteRating(id) {
    return await prisma.rating.delete({ where: { id: Number(id) } });
  },
};

export default RatingService;