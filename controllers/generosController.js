const { log } = require('console');
const bodyParser = require('body-parser');
const express = require('express');
const db = require('../database/models/index.js');
const path = require('path');
const initModels = require('../database/models/init-models');
const models = initModels(db.sequelize);
const { generos, canciones } = models;

const controller = {
    generos: (req, res) => {
        res.render('generos.ejs');
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

    listado: async (req, res) => {

        try {

            const cancion = await canciones.findAll({ raw: true });
            const { QueryTypes } = require('sequelize');
            const genero = await db.sequelize.query("SELECT a.id as genero_id, a.name as name, b.* from generos a right join canciones b on a.id=b.genero_id order by a.id", { type: QueryTypes.SELECT });
            console.log(genero)

            //const genero = await generos.findAll{(
            //    raw:true,
            //    include:[
            //        {model :canciones, as 'canciones',
            //            required:false
            //        }
            //    ]
            // })
            // console.log(genero);
            
            //res.render("generos", { genero: genero });
            
            return res.status(200).json({data:genero, status:200, response:'ok'});
            


        } catch (error) {
            console.log(error);
            console.log('error de consola');
        }
    }
}


module.exports = controller;