const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

const AuthService = {
  // Registra un nuevo usuario
  async register(userData) {
    const { password, passwordConfirmation, ...otherData } = userData;

    if (password !== passwordConfirmation) {
      throw new Error('Las contraseñas no coinciden');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        username: userData.username,
        name: userData.name,
        createdAt: new Date(),
      },
    });

    return { id: newUser.id, email: newUser.email };
  },

  // Inicia sesión de un usuario
  async login(email, password) {
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error('Contraseña incorrecta');
    }

    const token = jwt.sign({ userId: user.id, role: user.role, username: user.username, email: user.email }, process.env.SECRET, { expiresIn: '1h' });
    return token;
  },

  // Verificar token JWT
  verifyToken(token) {
    try {
      return jwt.verify(token, process.env.SECRET);
    } catch (error) {
      throw new Error('Token inválido');
    }
  }
};

module.exports = AuthService;