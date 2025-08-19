'use strict';

const { db, uid, nowISO } = require('../data/store');
const productService = require('./products');
const cartService = require('./cart');

class OrderService {
  listOrders(userId) {
    return db.orders.filter(o => o.userId === userId);
  }

  getOrder(userId, orderId) {
    const order = db.orders.find(o => o.id === orderId && o.userId === userId);
    if (!order) {
      const err = new Error('Order not found');
      err.status = 404;
      throw err;
    }
    return order;
  }

  /**
   * Perform a simple checkout flow:
   * - Validate stock for all cart items
   * - Reduce stock
   * - Create order
   * - Clear cart
   */
  checkout(userId) {
    const cart = cartService.getCart(userId);
    if (!cart.items.length) {
      const err = new Error('Cart is empty');
      err.status = 400;
      throw err;
    }

    // Validate and compute order
    const items = cart.items.map(({ productId, quantity }) => {
      const p = productService.getById(productId);
      if (quantity > p.stock) {
        const err = new Error(`Insufficient stock for product: ${p.name}`);
        err.status = 400;
        throw err;
      }
      return {
        productId: p.id,
        name: p.name,
        price: p.price,
        quantity,
      };
    });

    // Deduct stock
    items.forEach(it => {
      const prod = db.products.find(p => p.id === it.productId);
      prod.stock -= it.quantity;
      prod.updatedAt = nowISO();
    });

    const total = Number(items.reduce((sum, it) => sum + it.price * it.quantity, 0).toFixed(2));
    const currency = 'USD';

    const order = {
      id: uid(),
      userId,
      items,
      total,
      currency,
      status: 'PLACED',
      createdAt: nowISO(),
    };
    db.orders.push(order);

    // Clear cart
    cart.items = [];
    cart.updatedAt = nowISO();

    return order;
  }
}

module.exports = new OrderService();
