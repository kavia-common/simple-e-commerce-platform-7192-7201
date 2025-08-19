'use strict';

const express = require('express');
const ordersController = require('../controllers/orders');
const { authRequired } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order history and checkout
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: List user's orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders
 *       401:
 *         description: Unauthorized
 */
router.get('/', authRequired, ordersController.list.bind(ordersController));

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details
 *       404:
 *         description: Not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', authRequired, ordersController.getById.bind(ordersController));

/**
 * @swagger
 * /orders/checkout:
 *   post:
 *     summary: Checkout current cart
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Order placed
 *       400:
 *         description: Invalid cart
 *       401:
 *         description: Unauthorized
 */
router.post('/checkout', authRequired, ordersController.checkout.bind(ordersController));

module.exports = router;
