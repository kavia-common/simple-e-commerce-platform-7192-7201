'use strict';

const orderService = require('../services/orders');

// PUBLIC_INTERFACE
/**
 * Controller for order operations and checkout.
 */
class OrdersController {
  /**
   * GET /orders
   */
  async list(req, res, next) {
    try {
      const items = orderService.listOrders(req.user.id);
      return res.status(200).json(items);
    } catch (err) {
      return next(err);
    }
  }

  /**
   * GET /orders/:id
   */
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const order = orderService.getOrder(req.user.id, id);
      return res.status(200).json(order);
    } catch (err) {
      return next(err);
    }
  }

  /**
   * POST /orders/checkout
   */
  async checkout(req, res, next) {
    try {
      const order = orderService.checkout(req.user.id);
      return res.status(201).json(order);
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = new OrdersController();
