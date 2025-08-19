'use strict';

/**
 * Very simple in-memory data store to keep the example self-contained.
 * In production, replace with a real database and repository layer.
 */

const crypto = require('crypto');

function uid() {
  return crypto.randomBytes(12).toString('hex');
}

const nowISO = () => new Date().toISOString();

// Seed products for demo
const seedProducts = [
  {
    id: uid(),
    name: 'Classic White T-Shirt',
    description: '100% cotton, unisex fit',
    price: 19.99,
    currency: 'USD',
    imageUrl: 'https://picsum.photos/seed/shirt/600/400',
    stock: 50,
    createdAt: nowISO(),
    updatedAt: nowISO(),
  },
  {
    id: uid(),
    name: 'Blue Denim Jeans',
    description: 'Regular fit, durable denim',
    price: 49.99,
    currency: 'USD',
    imageUrl: 'https://picsum.photos/seed/jeans/600/400',
    stock: 35,
    createdAt: nowISO(),
    updatedAt: nowISO(),
  },
  {
    id: uid(),
    name: 'Running Sneakers',
    description: 'Lightweight and comfortable',
    price: 79.99,
    currency: 'USD',
    imageUrl: 'https://picsum.photos/seed/sneakers/600/400',
    stock: 20,
    createdAt: nowISO(),
    updatedAt: nowISO(),
  },
];

const db = {
  users: [
    // Example user: { id, name, email, passwordHash, createdAt, updatedAt }
  ],
  products: seedProducts,
  carts: {
    // userId: { userId, items: [{ productId, quantity }], updatedAt }
  },
  orders: [
    // { id, userId, items: [{ productId, name, price, quantity }], total, currency, status, createdAt }
  ],
};

module.exports = {
  db,
  uid,
  nowISO,
};
