/**
 * @swagger
 * /public/v1/home:
 *   get:
 *     summary: Home Page
 *     description: Retorna home page.
 *     tags:
 *       - public
 *     responses:
 *       200:
 *         description: Retorna home page de Apresentação.
 * 
 */

const express = require('express');
const router = express.Router();
const homeController = require('../../../controllers/v1/public/homeController.js');

router.get('/v1/home', homeController.getHomePage);

module.exports = router;