const { log } = require('console');
const bodyParser = require('body-parser');
const express = require('express');
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

    getCreate: (req, res) => {
        res.render('agregarCancion');
    },

    create: async (req, res) => {

        const bodyData = req.body;

        console.log(req.body);

        const nuevaCancion = {
            id: bodyData.id,
            titulo: bodyData.titulo,
            duracion: bodyData.duracion,
            genero_id: bodyData.genero_id,
            album_id: bodyData.album_id,
            artista_id: bodyData.artista_id
        }

        try {

            await canciones.create(nuevaCancion);

            res.redirect('/canciones');

        } catch (error) {

            res.send(error);
        }

    }, 
    
    getEdit: async (req, res) => {

        try {

            const cancion = await canciones.findByPk(req.params.id);
            res.render('editarCancion', {cancion});

        } catch (error) {

            res.send(error);
        }

    },

    edit: async (req, res) => {

        const bodyData = req.body;

        const updatedCancion = {
            id: bodyData.id,
            titulo: bodyData.titulo,
            duracion: bodyData.duracion,
            genero_id: bodyData.genero_id,
            album_id: bodyData.album_id,
            artista_id: bodyData.artista_id
        }

        try {
            
            await canciones.update(updatedCancion, {
                where: {
                    id: req.params.id
                }
            });
            res.redirect('/canciones');


        } catch (error) {
            res.send(error);
        }
    },

    getEliminar: async (req, res) => {
        
        const cancionId = req.params.id;

        const cancionn = await canciones.findByPk(cancionId, { raw: true });

        try {
            res.render('eliminarCancion', {cancionn});

        } catch (error) {
            console.log(error);
        }
    },

    eliminar: async (req, res) => {
        
        const id = req.params.id;
        
        try {
            
            canciones.destroy({
                where: {
                    id
                }
            })
            
        } catch (error) {
            console.log(error);
        }
        
        res.redirect('/canciones');
    }
}

module.exports = controller;