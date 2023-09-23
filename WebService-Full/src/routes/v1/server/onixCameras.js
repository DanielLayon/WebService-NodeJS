/**
 * @swagger
 * /server/v1/onixCameras:
 *   post:
 *     summary: Gerar videos da integração da onix.
 *     description: Busca video de um alerta especifico.
 *     tags:
 *       - server
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Header de autenticação.
 *         schema:
 *           type: string
 *       - in: body
 *         name: body
 *         description: Objeto de para solicitar video na onix.
 *         schema:
 *           type: object
 *           required:
 *              - login
 *              - senha
 *              - mid
 *              - dthr
 *              - irnCliente
 *              - irnEvento
 *           properties:
 *              login:
 *                type: string
 *              senha:
 *                type: string
 *              mid:
 *                type: string
 *              dthr:
 *                type: string
 *              irnCliente:
 *                type: string
 *              irnEvento:
 *                type: string
 *     responses:
 *       200:
 *         description: Sucesso
 *       401:
 *         description: Não autorizado
 *     security:
 *       - api_key: []
 */

const express = require('express');
const router = express.Router();
const serverController = require('../../../controllers/v1/server/onixCamerasController.js');
const authenticate = require('../../../middleware/authenticate');

router.post('/v1/onixCameras', authenticate, serverController.getOnixCamera);

module.exports = router;