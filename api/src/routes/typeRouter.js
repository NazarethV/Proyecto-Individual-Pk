const { Router } = require('express')
const { getTypes } = require('../handlers/getTypes');
const { postType } = require('../handlers/postType');


const typeRouter = Router();
//Ya viene con "/types" de index.js --> routes

//Ruta para traer todos los types
typeRouter.get('/', getTypes)

//Ruta para crear un nuevo type
typeRouter.post('/', postType)


module.exports = typeRouter;
