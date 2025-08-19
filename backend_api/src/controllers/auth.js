'use strict';

const authService = require('../services/auth');
const { requireFields, assertEmail } = require('../utils/validate');

// PUBLIC_INTERFACE
/**
 * Controller handling authentication routes.
 * - POST /auth/register: Register a new user
 * - POST /auth/login: Login existing user
 */
class AuthController {
  /**
   * Register a new user.
   * Body: { name, email, password }
   * Returns: { id, name, email, token }
   */
  async register(req, res, next) {
    try {
      const { name, email, password } = req.body || {};
      requireFields({ name, email, password }, ['name', 'email', 'password']);
      assertEmail(email);
      if (String(password).length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
      }
      const result = authService.createUser({ name, email, password });
      return res.status(201).json(result);
    } catch (err) {
      return next(err);
    }
  }

  /**
   * Login user.
   * Body: { email, password }
   * Returns: { id, name, email, token }
   */
  async login(req, res, next) {
    try {
      const { email, password } = req.body || {};
      requireFields({ email, password }, ['email', 'password']);
      assertEmail(email);
      const result = authService.login({ email, password });
      return res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = new AuthController();
