'use strict';

const productService = require('../services/products');

// PUBLIC_INTERFACE
/**
 * Controller for product listing and details.
 */
class ProductsController {
  /**
   * GET /products
   * Query: q (optional) for search
   */
  async list(req, res, next) {
    try {
      const { q } = req.query || {};
      const items = productService.list({ q });
      return res.status(200).json(items);
    } catch (err) {
      return next(err);
    }
  }

  /**
   * GET /products/:id
   */
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const product = productService.getById(id);
      return res.status(200).json(product);
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = new ProductsController();
