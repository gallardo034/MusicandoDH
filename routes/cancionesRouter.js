const express = require('express');
const router = express.Router();
const cancionesController = require ('../controllers/cancionesController.js');

router.get('/canciones', cancionesController.list);

router.get('/canciones/:id', cancionesController.getById);

router.post('/canciones/agregar', cancionesController.createOne);

module.exports = router ;