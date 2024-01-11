import { Router } from 'express';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import PaymentsService from '../../services/paymentServices';

const router = Router();

router.post("/", async (req, res) => {
  try {
    const secret_header = req.headers["x-signature-id"];

    if (!process.env.MERCADO_PAGO_WEBHOOKS) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_KEY });

    const payment = await new Payment(client).get({
      id: req.body.data.id,
    });

    const paymentToAdd = {
      id: payment.id,
      amount: payment.transaction_amount,
      description: payment.description,
    }

    const paymentCreated = await PaymentsService.createPayment(paymentToAdd);

    res.json({ message: "Ok" }).status(200);
  } catch (err) {
    console.log(err);
    res.json({ message: "Status Error" }).status(500);
  }
});

export default router;
