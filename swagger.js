const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'CSE341 Project 2 API',
    description: 'API for exploring National Parks and Activities',
  },
  host: 'localhost:3000',
  schemes: ['http', 'https'],
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Enter your bearer token in the format: Bearer <token>'
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
