const express = require('express');
const router = express.Router();
const generosController = require ('../controllers/generosController.js');

router.get('/generos', generosController.listado);

module.exports = router ;