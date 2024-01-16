const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const mainRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const pokemonsRouter = require('./pokemonsRouter')
const typeRouter = require('./typeRouter')

mainRouter.use('/pokemons', pokemonsRouter)
mainRouter.use('/types', typeRouter)


module.exports = mainRouter;
