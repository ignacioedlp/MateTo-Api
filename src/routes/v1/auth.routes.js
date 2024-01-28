import { Router } from 'express';
import AuthService from '../../services/authServices';
import UserService from '../../services/userServices';
import logger from '../../config/logger';
import { sendEmail } from '../../services/emailServices';

const router = Router();

router.post('/signup', async (req, res) => {
  try {

    const userVerify = await AuthService.verifyOTP(req.body.email, parseInt(req.body.otp));

    if (!userVerify) {
      throw new Error('Codigo de verificacion incorrecto');
    }

    const user = await AuthService.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error.message);
  }
});

router.post('/signin', async (req, res) => {
  try {
    const data = await AuthService.login(req.body.email, req.body.password);
    res.json(data);
  } catch (error) {
    logger.error(error.message);
    res.status(401).send(error.message);
  }
});

router.post('/change-password', async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const user = AuthService.verifyToken(token);
    if (user.email !== email) {
      throw new Error('No tienes permisos para cambiar la contraseña');
    }
    if (AuthService.verifyPassword(email, oldPassword) === false) {
      throw new Error('Contraseña incorrecta');
    }
    await AuthService.changePassword(email, newPassword);
    res.status(204).end();
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error.message);
  }
});

router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserService.getUserByEmail(email);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const token = AuthService.generateToken({ email: user.email });
    const link = `http://localhost:3000/reset-password/${token}`;

    const resend = new Resend('re_AmJstsp6_BfTwFfE98mhk75vwMVukXBq9');

    const { error } = await resend.emails.send({
      from: 'MateTo <support@resend.dev>',
      to: [email],
      subject: 'Forgot Password',
      html: `<p>Click <a href="${link}">here</a> to reset your password</p>`,
    });

    if (error) {
      throw new Error('Error al enviar el email');
    }

    res.status(204).json({ message: 'Email enviado' });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error.message);
  }
});

router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const { email } = AuthService.verifyToken(token);
    await AuthService.changePassword(email, newPassword);
    res.status(204).end();
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error.message);
  }
});

router.post('/verify-email', async (req, res) => {
  try {
    const { email } = req.body;

    const otp = await AuthService.generateOTP(email);

    const result = await sendEmail(
      email,
      'Verificacion de email',
      `<p>El codigo de verificacion es: ${otp}, es valido por un dia.</p>`
    );

    if (!result) {
      throw new Error('Error al enviar el email');
    }

    res.status(204).json({ message: 'Email enviado' });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error.message);
  }
});

export default router;
