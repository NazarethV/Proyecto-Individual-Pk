// const { Pokemon, Type } = require('../db');
// const { getPokemonDataFromApi } = require('../utils/pokemonApi');
// const { Op } = require('sequelize');

// const getPokemonFromApi = async (name) => {
//   try {
//     const allApi = await getPokemonDataFromApi();
//     const pokemonFromApi = allApi.find((pokemon) => pokemon.name.toLowerCase() === name.toLowerCase());
//     return pokemonFromApi || null;
//   } catch (error) {
//     console.error('Error fetching data from Pokemon API:', error);
//     throw error;
//   }
// };

// const pokemonNameController = async (name) => {
//   try {
//     // Buscar en la API primero
//     const pokemonFromApi = await getPokemonFromApi(name);

//     if (pokemonFromApi) {
//       // Si se encuentra en la API, devolver los datos
//       return [pokemonFromApi];
//     }

//     // Si no se encuentra en la API, buscar en la base de datos
//     const pokemonsByName = await Pokemon.findAll({
//       where: {
//         name: {
//           [Op.iLike]: `%${name}%`,
//         },
//       },
//       include: {
//         model: Type,
//         through: { attributes: [] },
//       },
//     });

//     return pokemonsByName;
//   } catch (error) {
//     console.error('Error en la consulta:', error);
//     throw error;
//   }
// };

// module.exports = {
//   pokemonNameController,
// };


const { allPokemonsController } = require('./allPokemonsController')
const { Op } = require('sequelize')

//Asincrono para manejar promesas
const pokemonNameController = async (name) => {
  //muestro todos los pokemons si no se encuentra el nombre
  const pokemons = await allPokemonsController()
  if(!allPokemonsController) throw Error('No hay pokemons')
  
  
  //FILTRO POR NOMBRE (filta allPokemonsController)
  const namePokemon = pokemons.filter(poke => poke.name.toLowerCase().includes(name.toLowerCase()))
  if(!namePokemon.length) throw Error('No se encontró pokemon con ese nombre')
  return namePokemon
}


module.exports = {
  pokemonNameController,
};


// const pokemonNameController = async (name) => {
//   try {
//     // Buscar en la API primero
//     const pokemonFromApi = await getPokemonFromApi(name);

//     if (pokemonFromApi) {
//       // Si se encuentra en la API, devolver los datos
//       return [pokemonFromApi];
//     }

//     // Si no se encuentra en la API, buscar en la base de datos
//     const pokemonsByName = await Pokemon.findAll({
//       where: {
//         name: {
//           [Op.iLike]: `%${name}%`,
//         },
//       },
//       // include: {
//       //   model: Type,
//       //   through: { attributes: [] },
//       // },
//     });

//     if(pokemonsByName){//Si jay info de ese nombre en la base de datos
//     //Encontrar info de sus types asociados en la base de datos
//       const pokemonTypes = await PokemonType.findAll({ //PokemonType es la tabla de la relacion del pokemon y las types
//         where: { PokemonId: pokemonsByName[0].id }, //Dentro de la tabla PokemonType:  PokemonId  | TypeId
//       });

//       const typeIds = pokemonTypes.map((type) => type.TypeId);
//       // Buscar información de los tipos en la base de datos
//       const typeDB = await Type.findAll({
//         where: { id: { [Op.in]: typeIds } },
//       });

//       // Crear un array con el nombre del tipo para cada tipo
//       const typeArray = typeDB.map((type) => type.name);
        
//       // Crear un objeto combinando la información del Pokémon y los nombres de los tipos
//       const pokemonWithTypes = {
//         ...pokemonsByName[0].toJSON(),
//         types: typeArray,
//       };

//       return pokemonWithTypes;


//     }

//     //return pokemonsByName;
//   } catch (error) {
//     console.error('Error en la consulta:', error);
//     throw error;
//   }
// };

// module.exports = {
//   pokemonNameController,
// };


