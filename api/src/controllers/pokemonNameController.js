const { Pokemon, Type } = require('../db');
const { getPokemonDataFromApi } = require('../utils/pokemonApi');
const { Op } = require('sequelize');

const getPokemonFromApi = async (name) => {
  try {
    const allApi = await getPokemonDataFromApi();
    const pokemonFromApi = allApi.find((pokemon) => pokemon.name.toLowerCase() === name.toLowerCase());
    return pokemonFromApi || null;
  } catch (error) {
    console.error('Error fetching data from Pokemon API:', error);
    throw error;
  }
};

const pokemonNameController = async (name) => {
  try {
    // Buscar en la API primero
    const pokemonFromApi = await getPokemonFromApi(name);

    if (pokemonFromApi) {
      // Si se encuentra en la API, devolver los datos
      return [pokemonFromApi];
    }

    // Si no se encuentra en la API, buscar en la base de datos
    const pokemonsByName = await Pokemon.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: {
        model: Type,
        through: { attributes: [] },
      },
    });

    return pokemonsByName;
  } catch (error) {
    console.error('Error en la consulta:', error);
    throw error;
  }
};

module.exports = {
  pokemonNameController,
};






// const { Pokemon, Type} = require('../db')
// const { Op } = require('sequelize')

// const pokemonNameController = async (name) => {
//     try {
//       const pokemonsByName = await Pokemon.findAll({
//         where: {
//           name: {
//             [Op.iLike]: `%${name}%`,
//           },
//         },
//         include: {
//           model: Type,
//           through: { attributes: [] },
//         },
//       });
  
//       console.log('Pokemons encontrados:', pokemonsByName);
  
//       return pokemonsByName;
//     } catch (error) {
//       console.error('Error en la consulta:', error);
//       throw error;
//     }
//   };
  

//   module.exports = {
//     pokemonNameController,
//   };