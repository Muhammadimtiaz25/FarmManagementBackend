// FILE: swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Farm Management API',
      version: '1.0.0',
      description: 'API documentation for Farm Management system',
    },
    servers: [
      { url: 'http://localhost:5000' }, // base URL
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            username: { type: 'string' },
            role: { type: 'string' },
          },
          example: { _id: "64d123abc4567890", username: "john", role: "farmer" },
        },
        Mission: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            robot: { type: 'string' },
            farmer: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            targetFarm: { type: 'string' },
            plannedAt: { type: 'string', format: 'date-time' },
          },
          example: {
            _id: "64d123abc4567890",
            robot: "64d234abc5678901",
            farmer: "64d345abc6789012",
            title: "Harvest Corn",
            description: "Harvest corn using robot X",
            targetFarm: "Farm 5",
            plannedAt: "2025-08-12T09:00:00Z",
          },
        },
        Robot: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            status: { type: 'string' },
            price: { type: 'number' },
          },
          example: { _id: "64d567abc6789012", name: "Robot X", status: "available", price: 500 },
        },
        Engineer: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            contact: { type: 'string' },
          },
          example: { _id: "64d678abc7890123", name: "Engineer Y", contact: "1234567890" },
        },
        Rental: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            robot: { type: 'string' },
            farmer: { type: 'string' },
            price: { type: 'number' },
            rentedAt: { type: 'string', format: 'date-time' },
          },
          example: {
            _id: "64d789abc8901234",
            robot: "64d567abc6789012",
            farmer: "64d123abc4567890",
            price: 500,
            rentedAt: "2025-08-12T09:00:00Z",
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./routes/*.js'], // yahan aapke route files ke comments se Swagger generate hoga
};

const specs = swaggerJsdoc(options);

function setupSwagger(app) {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));
}

module.exports = setupSwagger;
