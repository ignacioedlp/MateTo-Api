import { Router } from 'express';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import PaymentsService from '../../services/paymentServices';
import logger from '../../config/logger';
import PurchaseService from '../../services/purchaseServices';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const secretHeader = req.headers['x-signature-id'] || process.env.MERCADO_PAGO_WEBHOOKS;

    if (!secretHeader) {
      return res.status(400).json({ message: 'Invalid request' });
    }

    const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_KEY });

    const payment = await new Payment(client).get({
      id: req.body.data.id,
    });

    const paymentToAdd = {
      id: payment.id,
      amount: payment.transaction_amount,
      description: payment.description,
      purchaseId: parseInt(payment.external_reference, 10),
    };

    const paymentCreated = await PaymentsService.createPayment(paymentToAdd);

    await PurchaseService.updatePurchase(parseInt(payment.external_reference, 10), { status: 'COMPLETED', paymentId: paymentCreated.id });

    return res.json({ message: 'Ok' }).status(200);
  } catch (err) {
    logger.error(err);
    return res.json({ message: 'Status Error' }).status(500);
  }
});

export default router;
