'use strict';

const express = require('express');
const productsController = require('../controllers/products');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product catalog
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: List products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query
 *     responses:
 *       200:
 *         description: List of products
 */
router.get('/', productsController.list.bind(productsController));

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Not found
 */
router.get('/:id', productsController.getById.bind(productsController));

module.exports = router;
