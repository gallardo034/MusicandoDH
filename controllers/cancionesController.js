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
  
        // LISTADO PARA FORMULARIO

    // list: async (req, res) => {

    //     try {

    //         const cancion = await canciones.findAll({ raw: true });
    //         res.render("canciones", { cancion: cancion });
    //         console.log('hola');
    //         console.log(cancion);


    //     } catch (error) {
    //         console.log(error);
    //         console.log('error de consola');
    //     }


    list: async (req, res) => {

        try {

            const cancion = await canciones.findAll({ raw: true });
            res.json(cancion);



        } catch (error) {
            console.log(error);
            res.json({ error: 'Server Error', code: '504' })
        }
    },


            // GETBYID PARA FORMULARIO

    //     getById: async (req, res) => {

    //     const cancionId = req.params.id;

    //     try {

    //         const cancionn = await canciones.findByPk(cancionId, { raw: true });
    //         res.render('idCanciones', { cancionn: cancionn });
    //         console.log(cancionn);

    //     } catch (error) {
    //         console.log(error);
    //     }

    //     //res.send ('detalle de la cancion ' + req.params.id);
    // },

    getById: async (req, res) => {

        const cancionId = req.params.id;

        try {

            const cancionn = await canciones.findByPk(cancionId, { raw: true });
            res.json({ cancionn });


        } catch (error) {
            console.log(error);
            res.json({ error: 'Server Error', code: '504' })
        }

    },

        // CREATE PARA FORMULARIO

    // getCreate: (req, res) => {
    //     res.render('agregarCancion');
    // },

    // create: async (req, res) => {

    //     const bodyData = req.body;

    //     console.log(req.body);

    //     const nuevaCancion = {
    //         id: bodyData.id,
    //         titulo: bodyData.titulo,
    //         duracion: bodyData.duracion,
    //         genero_id: bodyData.genero_id,
    //         album_id: bodyData.album_id,
    //         artista_id: bodyData.artista_id
    //     }

    //     try {

    //         await canciones.create(nuevaCancion);
    //         //res.redirect('/canciones');
    //         return res.json({data:nuevaCancion, status: 200, created: 'ok'});

    //     } catch (error) {

    //         res.send(error);
    //     }

    // },

    getCreate: (req, res) => {
        res.render('agregarCancion');
    },

    create: async (req, res) => {

        try {

            const data = {
                id: req.body.id,
                titulo: req.body.titulo,
                duracion: req.body.duracion,
                genero_id: req.body.genero_id,
                album_id: req.body.album_id,
                artista_id: req.body.artista_id
            }
            const nuevaCancion = await db.canciones.create(data);
            //res.redirect('/canciones');
            //return res.json({data:nuevaCancion, status: 200, created: 'ok'});
            res.status(201).json(nuevaCancion);

        } catch (error) {
            console.error(error);
        }

    },

        // EDITAR PARA FORMULARIO

    // getEdit: async (req, res) => {

    //     try {

    //         const cancion = await canciones.findByPk(req.params.id);
    //         res.render('editarCancion', { cancion });

    //     } catch (error) {

    //         res.send(error);
    //     }

    // },

    // edit: async (req, res) => {

    //     const bodyData = req.body;

    //     const updatedCancion = {
    //         id: bodyData.id,
    //         titulo: bodyData.titulo,
    //         duracion: bodyData.duracion,
    //         genero_id: bodyData.genero_id,
    //         album_id: bodyData.album_id,
    //         artista_id: bodyData.artista_id
    //     }

    //     try {

    //         await canciones.update(updatedCancion, {
    //             where: {
    //                 id: req.params.id
    //             }
    //         });
    //         res.redirect('/canciones');


    //     } catch (error) {
    //         res.send(error);
    //     }
    // },

    getEdit: async (req, res) => {

        try {

            const cancion = await db.canciones.findByPk(req.params.id);
            res.json(cancion);

        } catch (error) {
            console.error(error);
        }

    },

    edit: async (req, res) => {
        const nueBody = JSON.parse(JSON.stringify(req.body));
        const updatedCancion = {

            id: nueBody.id,
            titulo: nueBody.titulo,
            duracion: nueBody.duracion,
            genero_id: nueBody.genero_id,
            album_id: nueBody.album_id,
            artista_id: nueBody.artista_id

        }
        console.log(req.params.id);
        console.log(updatedCancion);
        try { console.log('antes de update');

            const editarCancion = await canciones.update(updatedCancion, {
                where: {
                    id: req.params.id
                }
            });
            console.log('despues de update');
            console.log(editarCancion);
            res.status(204).json(editarCancion);


        } catch (error) {
            console.log(error);
        }
    },

    // ELIMINAR PARA FORMULARIO

    // getEliminar: async (req, res) => {

    //     const cancionId = req.params.id;

    //     const cancionn = await canciones.findByPk(cancionId, { raw: true });

    //     try {
    //         res.render('eliminarCancion', { cancionn });

    //     } catch (error) {
    //         console.log(error);
    //     }
    // },

    // eliminar: async (req, res) => {

    //     const id = req.params.id;

    //     try {

    //         canciones.destroy({
    //             where: {
    //                 id
    //             }
    //         })

    //     } catch (error) {
    //         console.log(error);
    //     }

    //     res.redirect('/canciones');
    // },

    getEliminar: async (req, res) => {

        try {
            const cancionId = req.params.id;
            const cancionn = await canciones.findByPk(cancionId, { raw: true });

            res.json(cancionn);

        } catch (error) {
            console.log(error);
        }
    },

    eliminar: async (req, res) => {
        const id = req.params.id;
        try {

            const eliminarCancion = await canciones.destroy({
                where: {
                    id: req.params.id
                }
            });
                res.json(eliminarCancion);
        } catch (error) {
            console.error(error);
        }

        
    },
}

module.exports = controller;