import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const PaymentsService = {

  async getAllPayments() {
    return await prisma.payment.findMany();
  },

  async getPaymentById(id) {
    return await prisma.payment.findUnique({
      where: { id: Number(id) }
    });
  },

  async createPayment(paymentData) {
    return await prisma.payment.create({ data: paymentData });
  },

  async updatePayment(id, paymentData) {
    return await prisma.payment.update({
      where: { id: Number(id) },
      data: paymentData
    });
  },

};

export default PaymentsService;