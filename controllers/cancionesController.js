const { log } = require('console');
const db = require('../database/models/index.js');
const path = require('path');
const initModels = require('../database/models/init-models');
const models = initModels(db.sequelize);
const { canciones } = models;


const controller = {
    canciones: (req, res) => {
        res.render('canciones.ejs');
    },

    list: async (req, res) => {

        try {

            const cancion = await canciones.findAll({ raw: true });
            res.render("canciones", { cancion: cancion });
            console.log('hola');
            console.log(cancion);


        } catch (error) {
            console.log(error);
            console.log('error de consola');
        }

    },
    getById: async (req, res) => {

        const cancionId = req.params.id;

        try {

            const cancionn = await canciones.findByPk(cancionId, { raw: true });
            res.render('idCanciones', { cancionn: cancionn });
            console.log(cancionn);

        } catch (error) {
            console.log(error);
        }

        //res.send ('detalle de la cancion ' + req.params.id);
    },

    createOne: async (req, res) => {
        const bodyData = req.body;
        const nuevaCancion = {
            id: bodyData.id,
            titulo: bodyData.titulo,
            duracion: bodyData.duracion,
            genero_id: bodyData.genero_id,
            album_id: bodyData.album_id,
            artista_id: bodyData.artista_id,
        };
        try { await canciones.create(nuevaCancion);
            
            res.render('agregarCancion', {nuevaCancion: nuevaCancion});
            console.log(nuevaCancion);

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = controller;