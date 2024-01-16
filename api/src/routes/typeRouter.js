const { Router } = require('express')
const { getTypes } = require('../handlers/getTypes')


const typeRouter = Router();
//Ya viene con "/types" de index.js --> routes

//Ruta para traer todos los types
typeRouter.get('/', getTypes)


module.exports = typeRouter;
