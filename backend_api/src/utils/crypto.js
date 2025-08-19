'use strict';

const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../config/env');

const SALT_LEN = 16;
const ITERATIONS = 100000;
const KEY_LEN = 64;
const DIGEST = 'sha512';

/**
 * Hash a password using PBKDF2.
 * @param {string} password
 * @returns {{salt: string, hash: string}}
 */
function hashPassword(password) {
  const salt = crypto.randomBytes(SALT_LEN).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LEN, DIGEST).toString('hex');
  return { salt, hash, iterations: ITERATIONS, digest: DIGEST };
}

/**
 * Verify password against PBKDF2 hash.
 * @param {string} password
 * @param {{salt: string, hash: string, iterations:number, digest:string}} stored
 */
function verifyPassword(password, stored) {
  const computed = crypto.pbkdf2Sync(password, stored.salt, stored.iterations || ITERATIONS, KEY_LEN, stored.digest || DIGEST).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(computed, 'hex'), Buffer.from(stored.hash, 'hex'));
}

/**
 * Generate a JWT for a user.
 * @param {{id:string,email:string,name:string}} user
 */
function generateJWT(user) {
  const payload = { sub: user.id, email: user.email, name: user.name };
  return jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
}

/**
 * Verify a JWT and return payload or throw.
 * @param {string} token
 */
function verifyJWT(token) {
  return jwt.verify(token, config.jwtSecret);
}

module.exports = {
  hashPassword,
  verifyPassword,
  generateJWT,
  verifyJWT,
};
