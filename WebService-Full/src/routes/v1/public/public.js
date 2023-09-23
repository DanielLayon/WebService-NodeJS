/**
 * @swagger
 * /public/v1/info:
 *   get:
 *     summary: Verificar servidor
 *     description: Verifica se servidor está ok.
 *     tags:
 *       - public
 *     responses:
 *       200:
 *         description: Servidor está OK.
 */

const express = require('express');
const router = express.Router();
const publicController = require('../../../controllers/v1/public/publicController');

router.get('/v1/info', publicController.getInfo);

module.exports = router;