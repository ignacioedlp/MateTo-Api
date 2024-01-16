import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PaymentsService = {

  async getAllPayments() {
    return prisma.payment.findMany();
  },

  async getPaymentById(id) {
    return prisma.payment.findUnique({
      where: { id: Number(id) },
    });
  },

  async createPayment(paymentData) {
    return prisma.payment.create({ data: paymentData });
  },

  async updatePayment(id, paymentData) {
    return prisma.payment.update({
      where: { id: Number(id) },
      data: paymentData,
    });
  },

};

export default PaymentsService;
