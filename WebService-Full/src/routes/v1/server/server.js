/**
 * @swagger
 * /server/v1/date:
 *   get:
 *     summary: Retorna a data do servidor.
 *     description: Retorna a data atual do servidor.
 *     tags:
 *       - server
 *     responses:
 *       200:
 *         description: Data do servidor retornada com sucesso.
 */

const express = require('express');
const router = express.Router();
const serverController = require('../../../controllers/v1/server/serverController');
const authenticate = require('../../../middleware/authenticate');

router.get('/v1/date', authenticate, serverController.getServerDate);

module.exports = router;