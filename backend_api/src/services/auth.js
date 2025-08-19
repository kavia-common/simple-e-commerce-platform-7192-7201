'use strict';

const { db, uid, nowISO } = require('../data/store');
const { hashPassword, verifyPassword, generateJWT } = require('../utils/crypto');

class AuthService {
  /**
   * Register a new user.
   * @param {{name:string,email:string,password:string}} payload
   * @returns {{id:string,name:string,email:string,token:string}}
   */
  createUser(payload) {
    const existing = db.users.find(u => u.email.toLowerCase() === payload.email.toLowerCase());
    if (existing) {
      const err = new Error('Email already in use');
      err.status = 409;
      throw err;
    }
    const { salt, hash, iterations, digest } = hashPassword(payload.password);
    const user = {
      id: uid(),
      name: payload.name,
      email: payload.email.toLowerCase(),
      passwordHash: { salt, hash, iterations, digest },
      createdAt: nowISO(),
      updatedAt: nowISO(),
    };
    db.users.push(user);
    const token = generateJWT(user);
    return { id: user.id, name: user.name, email: user.email, token };
  }

  /**
   * Authenticate a user and return token.
   * @param {{email:string,password:string}} payload
   */
  login(payload) {
    const user = db.users.find(u => u.email.toLowerCase() === payload.email.toLowerCase());
    if (!user) {
      const err = new Error('Invalid credentials');
      err.status = 401;
      throw err;
    }
    const valid = verifyPassword(payload.password, user.passwordHash);
    if (!valid) {
      const err = new Error('Invalid credentials');
      err.status = 401;
      throw err;
    }
    const token = generateJWT(user);
    return { id: user.id, name: user.name, email: user.email, token };
  }
}

module.exports = new AuthService();
