'use strict';

const cartService = require('../services/cart');
const { assertPositiveInt, requireFields } = require('../utils/validate');

// PUBLIC_INTERFACE
/**
 * Controller for user shopping cart operations.
 */
class CartController {
  /**
   * GET /cart
   */
  async getCart(req, res, next) {
    try {
      const cart = cartService.getCart(req.user.id);
      return res.status(200).json(cart);
    } catch (err) {
      return next(err);
    }
  }

  /**
   * POST /cart/items
   * Body: { productId, quantity }
   */
  async addItem(req, res, next) {
    try {
      const { productId, quantity } = req.body || {};
      requireFields({ productId, quantity }, ['productId', 'quantity']);
      assertPositiveInt(Number(quantity), 'quantity');
      const cart = cartService.addItem(req.user.id, productId, Number(quantity));
      return res.status(200).json(cart);
    } catch (err) {
      return next(err);
    }
  }

  /**
   * PUT /cart/items/:productId
   * Body: { quantity }
   */
  async updateItem(req, res, next) {
    try {
      const { productId } = req.params;
      const { quantity } = req.body || {};
      requireFields({ quantity }, ['quantity']);
      const q = Number(quantity);
      if (!Number.isInteger(q)) {
        return res.status(400).json({ message: 'quantity must be an integer' });
      }
      const cart = cartService.updateItem(req.user.id, productId, q);
      return res.status(200).json(cart);
    } catch (err) {
      return next(err);
    }
  }

  /**
   * DELETE /cart/items/:productId
   */
  async removeItem(req, res, next) {
    try {
      const { productId } = req.params;
      const cart = cartService.removeItem(req.user.id, productId);
      return res.status(200).json(cart);
    } catch (err) {
      return next(err);
    }
  }

  /**
   * DELETE /cart
   */
  async clearCart(req, res, next) {
    try {
      const cart = cartService.clearCart(req.user.id);
      return res.status(200).json(cart);
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = new CartController();
