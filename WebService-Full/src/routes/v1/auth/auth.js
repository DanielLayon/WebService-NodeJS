/**
 * @swagger
 * /auth/v1/login:
 *   post:
 *     summary: Método de autenticação da api.
 *     description: Autentica e retorna o JWT que será usado nos próximos requests.
 *     tags:
 *       - auth
 *     parameters:
 *       - in: body
 *         name: auth
 *         description: Objeto de autentitação.
 *         schema:
 *           type: object
 *           required:
 *             - username
 *             - password
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: Sucesso.
 *       401:
 *         description: Acesso inválido.
 */

const express = require('express');
const router = express.Router();
const authController = require('../../../controllers/v1/auth/authController');

router.post('/v1/login', authController.login);

module.exports = router;