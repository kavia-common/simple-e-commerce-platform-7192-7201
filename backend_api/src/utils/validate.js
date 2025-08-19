'use strict';

/**
 * Simple validation helpers for inputs.
 */

function requireFields(obj, fields) {
  const missing = fields.filter(f => obj[f] === undefined || obj[f] === null || obj[f] === '');
  if (missing.length > 0) {
    const err = new Error(`Missing required fields: ${missing.join(', ')}`);
    err.status = 400;
    throw err;
  }
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').toLowerCase());
}

function assertEmail(value, fieldName = 'email') {
  if (!isEmail(value)) {
    const err = new Error(`Invalid ${fieldName} format`);
    err.status = 400;
    throw err;
  }
}

function assertPositiveInt(n, fieldName) {
  if (!Number.isInteger(n) || n <= 0) {
    const err = new Error(`${fieldName || 'value'} must be a positive integer`);
    err.status = 400;
    throw err;
  }
}

module.exports = {
  requireFields,
  assertEmail,
  assertPositiveInt,
};
