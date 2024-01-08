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

    let rolToAssign = null;

    if (userData.isUser) {
      const rol = await prisma.role.findFirst({ where: { name: 'USER' } });
      rolToAssign = rol;
    } else {
      const rol = await prisma.role.findFirst({ where: { name: 'VENDOR' } });
      rolToAssign = rol;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        username: userData.username,
        name: userData.name,
        createdAt: new Date(),
        roleId: rolToAssign.id
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

    const role = await prisma.role.findFirst({ where: { id: user.roleId } });

    console.log(role);

    const token = this.generateToken({ userId: user.id, role: role.name, username: user.username, email: user.email });
    return {
      token,
      user: {
        imageProfile: user.imageProfile,
      },
    };
  },

  // Verificar token JWT
  verifyToken(token) {
    try {
      return jwt.verify(token, process.env.SECRET);
    } catch (error) {
      throw new Error('Token inválido');
    }
  },

  // Verificar contraseña
  async verifyPassword(email, password) {
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    return validPassword;
  },

  // Cambiar contraseña
  async changePassword(email, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });
  },

  // Generar token JWT
  generateToken(data) {
    return jwt.sign(data, process.env.SECRET, { expiresIn: '7d' });
  },
};

module.exports = AuthService;