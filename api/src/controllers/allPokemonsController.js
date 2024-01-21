const { Pokemon, Type } = require('../db');
const { getPokemonDataFromApi } = require('../utils/pokemonApi');

const allPokemonsController = async () => {
  try {
    const pokemonDB = await Pokemon.findAll({
      include: [
        {
          model: Type,
          as: 'Types',
          //attributes: ['id', 'name'],
          attributes: ['name'],
          through: {
            attributes: [],
          },
        },
      ],
    });

    const pokemonApi = await getPokemonDataFromApi();

    // Transformar la estructura de los tipos de la base de datos
    const transformedPokemonDB = pokemonDB.map((pokemon) => ({
      ...pokemon.toJSON(),
      types: pokemon.Types.map((type) => type.name),
    }));


    return [...transformedPokemonDB, ...pokemonApi];

  } catch (error) {
    console.error('Error en allPokemonsController:', error);
    throw error;
  }
};

module.exports = {
  allPokemonsController,
};

// const { Pokemon, Type } = require('../db')
// const { getPokemonDataFromApi } = require('../utils/pokemonApi')

// const allPokemonsController = async () =>{

//     const pokemonDB = await Pokemon.findAll({
//         include: [
//             {
//                 model: Type,
//                 as: 'Types',
//                 attributes: ['id', 'name'],
//                 through: {
//                     attributes: [],
//                 }
//             }
//         ]
//     })

//     const pokemonApi = await getPokemonDataFromApi(); // await para esperar a que la promesa se resuelva
//     return [...pokemonDB, ...pokemonApi];

// }

// module.exports = {
//     allPokemonsController
// }
