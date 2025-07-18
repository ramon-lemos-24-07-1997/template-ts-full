const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Template API',
      version: '1.0.0',
      description: 'Documentação da API Template',
    },
    servers: [
      {
        url: process.env?.NODE_ENV === 'dev'
          ? 'http://localhost:4000'
          : 'https://sua-api.com.br',
        description: process.env?.NODE_ENV === 'dev' ? 'Local' : 'Produção',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: [
    './src/docs/swagger/teste.yaml',
    
  ],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = (app) => {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      customSiteTitle: 'Teste - API Docs',
      customfavIcon: 'https://seusite.com/favicon.ico',
      customCss: `
        .swagger-ui .topbar { background-color: #2c3e50; }
        .swagger-ui .topbar .topbar-wrapper span { display: none; }
        .swagger-ui .topbar .topbar-wrapper::before {
          content: 'EduTech API';
          font-size: 20px;
          font-weight: bold;
          color: white;
          display: block;
          margin-left: 20px;
          padding: 10px 0;
        }
        .swagger-ui .btn {
          background-color: #27ae60;
          border-color: #27ae60;
        }
        .swagger-ui .btn:hover {
          background-color: #2ecc71;
          border-color: #2ecc71;
        }
        .swagger-ui .scheme-container {
          background: #f9f9f9;
          border-radius: 8px;
          padding: 10px;
          margin-bottom: 20px;
        }
      `,
    })
  );
};
