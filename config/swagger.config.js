const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Eduversa API',
      version: '1.0.0',
      description: 'API documentation for your Eduversa API',
    },
  },
  apis: [path.join(process.cwd(), '/routes/*.routes.js')]
};
const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;