const dotenv = require('dotenv')
const swaggerJsdoc = require('swagger-jsdoc');

dotenv.config();
const { VERSAO_ROTAS } = process.env;

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'SITX9',
      version: '1.0.0',
      description: 'Documentação de todos métodos internos usados pelas aplicações do SITX9.',
      contact: {
        name: "Daniel Layon",
        email: "daniel.layon@outlook.com"
      }
    },
    host: "petstore.swagger.io",
    basePath: `${VERSAO_ROTAS}`,
    schemes: [
      "https",
      "http"
    ],
    tags: [
      {
          name: "public",
          description: "Métodos Públicos que não precisam de Autenticação"
      },
      {
          name: "auth",
          description: "Métodos de Autenticação",
      },
      {
          name: "server",
          description: "Métodos do Server",
      }
    ],
  },


  apis: 
  [
    `./src/routes/${VERSAO_ROTAS}/auth/*.js`,
    `./src/routes/${VERSAO_ROTAS}/public/*.js`,
    `./src/routes/${VERSAO_ROTAS}/server/*.js`
  ],
};

const specs = swaggerJsdoc(options);

module.exports = specs;