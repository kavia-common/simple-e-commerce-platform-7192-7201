const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Simple E-commerce API',
      version: '1.0.0',
      description: 'REST API for authentication, products, cart, and orders.',
    },
    tags: [
      { name: 'Health', description: 'Service health check' },
      { name: 'Auth', description: 'User authentication and registration' },
      { name: 'Products', description: 'Product catalog' },
      { name: 'Cart', description: 'Shopping cart management' },
      { name: 'Orders', description: 'Order history and checkout' },
    ],
  },
  apis: ['./src/routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
