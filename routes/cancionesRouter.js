const express = require('express');
const router = express.Router();
const cancionesController = require ('../controllers/cancionesController.js');

router.get('/canciones', cancionesController.list);

router.get('/canciones/:id', cancionesController.getById);

router.get('/crear', cancionesController.getCreate);

router.post('/canciones', cancionesController.create);

router.get('/canciones/:id/editar', cancionesController.getEdit);

router.put('/canciones/:id/editar', cancionesController.edit);

router.delete('/canciones/:id/eliminar', cancionesController.eliminar);

module.exports = router ;