'use strict';

const { db, nowISO } = require('../data/store');
const productService = require('./products');

function getOrCreateCart(userId) {
  let cart = db.carts[userId];
  if (!cart) {
    cart = { userId, items: [], updatedAt: nowISO() };
    db.carts[userId] = cart;
  }
  return cart;
}

class CartService {
  getCart(userId) {
    return getOrCreateCart(userId);
  }

  addItem(userId, productId, quantity) {
    const product = productService.getById(productId);
    if (quantity > product.stock) {
      const err = new Error('Requested quantity exceeds stock');
      err.status = 400;
      throw err;
    }
    const cart = getOrCreateCart(userId);
    const existing = cart.items.find(i => i.productId === productId);
    if (existing) {
      const newQty = existing.quantity + quantity;
      if (newQty > product.stock) {
        const err = new Error('Requested quantity exceeds stock');
        err.status = 400;
        throw err;
      }
      existing.quantity = newQty;
    } else {
      cart.items.push({ productId, quantity });
    }
    cart.updatedAt = nowISO();
    return cart;
  }

  updateItem(userId, productId, quantity) {
    const product = productService.getById(productId);
    const cart = getOrCreateCart(userId);
    const existing = cart.items.find(i => i.productId === productId);
    if (!existing) {
      const err = new Error('Item not in cart');
      err.status = 404;
      throw err;
    }
    if (quantity <= 0) {
      cart.items = cart.items.filter(i => i.productId !== productId);
    } else {
      if (quantity > product.stock) {
        const err = new Error('Requested quantity exceeds stock');
        err.status = 400;
        throw err;
      }
      existing.quantity = quantity;
    }
    cart.updatedAt = nowISO();
    return cart;
  }

  removeItem(userId, productId) {
    const cart = getOrCreateCart(userId);
    const before = cart.items.length;
    cart.items = cart.items.filter(i => i.productId !== productId);
    if (cart.items.length === before) {
      const err = new Error('Item not in cart');
      err.status = 404;
      throw err;
    }
    cart.updatedAt = nowISO();
    return cart;
  }

  clearCart(userId) {
    const cart = getOrCreateCart(userId);
    cart.items = [];
    cart.updatedAt = nowISO();
    return cart;
  }
}

module.exports = new CartService();
