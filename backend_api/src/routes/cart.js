'use strict';

const express = require('express');
const cartController = require('../controllers/cart');
const { authRequired } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Shopping cart management
 */

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get current user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart
 *       401:
 *         description: Unauthorized
 */
router.get('/', authRequired, cartController.getCart.bind(cartController));

/**
 * @swagger
 * /cart/items:
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [productId, quantity]
 *             properties:
 *               productId: { type: string }
 *               quantity: { type: integer, minimum: 1 }
 *     responses:
 *       200:
 *         description: Updated cart
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
router.post('/items', authRequired, cartController.addItem.bind(cartController));

/**
 * @swagger
 * /cart/items/{productId}:
 *   put:
 *     summary: Update item quantity in cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [quantity]
 *             properties:
 *               quantity: { type: integer }
 *     responses:
 *       200:
 *         description: Updated cart
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Item not in cart
 *       401:
 *         description: Unauthorized
 */
router.put('/items/:productId', authRequired, cartController.updateItem.bind(cartController));

/**
 * @swagger
 * /cart/items/{productId}:
 *   delete:
 *     summary: Remove item from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Updated cart
 *       404:
 *         description: Item not in cart
 *       401:
 *         description: Unauthorized
 */
router.delete('/items/:productId', authRequired, cartController.removeItem.bind(cartController));

/**
 * @swagger
 * /cart:
 *   delete:
 *     summary: Clear cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Emptied cart
 *       401:
 *         description: Unauthorized
 */
router.delete('/', authRequired, cartController.clearCart.bind(cartController));

module.exports = router;
