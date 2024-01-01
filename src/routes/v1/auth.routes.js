const express = require('express');
const AuthService = require('../../services/authServices');
const UserService = require('../../services/userServices');
const router = express.Router();
const logger = require('../../config/logger');

router.post('/signup', async (req, res) => {
  try {
    const user = await AuthService.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    logger.error(error.message);
    res.status(500).send(error.message);
  }
});

router.post('/signin', async (req, res) => {
  try {
    const token = await AuthService.login(req.body.email, req.body.password);
    const user = await UserService.getUserByEmail(req.body.email);
    res.json({ token, email: user.email, name: user.name, id: user.id });
  } catch (error) {
    logger.error(error.message);
    res.status(401).send(error.message);
  }
});

module.exports = router;