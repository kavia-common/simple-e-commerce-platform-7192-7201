'use strict';

const { db } = require('../data/store');
const { verifyJWT } = require('../utils/crypto');

/**
 * Express middleware to authenticate requests via Bearer token.
 * Attaches req.user if valid.
 */
function authRequired(req, res, next) {
  const hdr = req.headers.authorization || '';
  const [scheme, token] = hdr.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Unauthorized: missing or invalid Authorization header' });
  }
  try {
    const payload = verifyJWT(token);
    const user = db.users.find(u => u.id === payload.sub);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: user not found' });
    }
    req.user = { id: user.id, email: user.email, name: user.name };
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized: invalid token' });
  }
}

module.exports = {
  authRequired,
};
