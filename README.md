# simple-e-commerce-platform-7192-7201

Backend API (Express)
- Health: GET /
- OpenAPI JSON: GET /openapi.json
- Swagger UI: GET /docs

Auth
- POST /auth/register { name, email, password }
- POST /auth/login { email, password }

Products
- GET /products
- GET /products/:id

Cart (requires Authorization: Bearer <token>)
- GET /cart
- POST /cart/items { productId, quantity }
- PUT /cart/items/:productId { quantity }
- DELETE /cart/items/:productId
- DELETE /cart

Orders (requires Authorization)
- GET /orders
- GET /orders/:id
- POST /orders/checkout

Environment variables
- PORT (default 3000)
- HOST (default 0.0.0.0)
- JWT_SECRET (required for production)
- JWT_EXPIRES_IN (default 7d)
- CORS_ORIGINS (comma-separated, default *)