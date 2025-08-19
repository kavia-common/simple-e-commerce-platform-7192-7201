'use strict';

const { db } = require('../data/store');

class ProductService {
  list({ q }) {
    let products = db.products;
    if (q) {
      const needle = String(q).toLowerCase();
      products = products.filter(
        p =>
          p.name.toLowerCase().includes(needle) ||
          (p.description || '').toLowerCase().includes(needle)
      );
    }
    return products;
  }

  getById(id) {
    const product = db.products.find(p => p.id === id);
    if (!product) {
      const err = new Error('Product not found');
      err.status = 404;
      throw err;
    }
    return product;
  }
}

module.exports = new ProductService();
