const axios = require('axios');
const { Pokemon, Type, PokemonType } = require('../db');
const { getPokemonDataFromApi } = require('../utils/pokemonApi');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

// Función de validación para UUIDv4 (porq los Id de la base de datos son de formato UUIDV4)
function isUUIDv4(id) {
  const uuidv4Regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
  return uuidv4Regex.test(id);
}

const pokemonIDController = async (id) => {
  console.log('Id recibido: ', id);

  // Validar el ID
  if (!id || (isNaN(Number(id)) && !isUUIDv4(id))) {//Si no es numero o no es un valor UUIDV4
    return 'ID no válido';
  }

  try {
    if (!isNaN(id)) {
      // Obtener datos de la API de Pokémon utilizando la utilidad
      const allPokemonApi = await getPokemonDataFromApi();

      // Buscar el Pokémon por ID en los datos obtenidos
      const pokemonID = allPokemonApi.find((pokemon) => pokemon.id === parseInt(id));

      if (pokemonID) {
        return {
          ...pokemonID,
          types: pokemonID.types //.spliy(', ')
        }
      } else {
        return 'No se encontró información para el Pokémon con el ID proporcionado';
      }
    } else {
      // Si el ID es un UUIDv4, buscar en la base de datos local
      const pokemonDB = await Pokemon.findOne({
        where: { id: id },
      });

      if (pokemonDB) {
        // Encontrar información de los tipos asociados en la base de datos
        const pokemonTypes = await PokemonType.findAll({
          where: { PokemonId: pokemonDB.id },
        });

        const typeIds = pokemonTypes.map((type) => type.TypeId);
        // Buscar información de los tipos en la base de datos
        const typeDB = await Type.findAll({
          where: { id: { [Op.in]: typeIds } },
        });

        // Crear un array con el nombre del tipo para cada tipo
        const typeArray = typeDB.map((type) => type.name);
        
        // Crear un objeto combinando la información del Pokémon y los nombres de los tipos
        const pokemonWithTypes = {
          ...pokemonDB.toJSON(),
          types: typeArray,
        };

        return pokemonWithTypes;
      } else {
        return 'No se encontró información para el Pokémon con el ID proporcionado';
      }
    }
  } catch (error) {
    console.error('Error en el controlador de Pokémon por ID:', error);
    throw error;
  }
};

module.exports = {
  pokemonIDController,
};





// const axios = require('axios');
// const { Pokemon, Type, PokemonType } = require('../db');
// const { getPokemonDataFromApi } = require('../utils/pokemonApi');
// const { Sequelize } = require('sequelize');
// const Op = Sequelize.Op;

// // Función de validación para UUIDv4 (porq los Id de la base de datos son de formato UUIDV4)
// function isUUIDv4(id) {
//   const uuidv4Regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
//   return uuidv4Regex.test(id);
// }

// const pokemonIDController = async (id) => {
//   console.log('Id recibido: ', id);

//   // Validar el ID
//   if (!id || (isNaN(Number(id)) && !isUUIDv4(id))) {//Si no es numero o no es un valor UUIDV4
//     return 'ID no válido';
//   }

//   try {
//     if (!isNaN(id)) {
//       // Obtener datos de la API de Pokémon utilizando la utilidad
//       const allPokemonApi = await getPokemonDataFromApi();

//       // Buscar el Pokémon por ID en los datos obtenidos
//       const pokemonID = allPokemonApi.find((pokemon) => pokemon.id === parseInt(id));

//       if (pokemonID) {
//         return pokemonID;
//       } else {
//         return 'No se encontró información para el Pokémon con el ID proporcionado';
//       }
//     } else {
//       // Si el ID es un UUIDv4, buscar en la base de datos local
//       const pokemonDB = await Pokemon.findOne({
//         where: { id: id },
//       });

//       if (pokemonDB) {
//         // Encontrar información de los tipos asociados en la base de datos
//         const pokemonTypes = await PokemonType.findAll({
//           where: { PokemonId: pokemonDB.id },
//         });

//         const typeIds = pokemonTypes.map((type) => type.TypeId);
//         // Buscar información de los tipos en la base de datos
//         const typeDB = await Type.findAll({
//           where: { id: { [Op.in]: typeIds } },
//         });

//         // Crear un objeto con el nombre del tipo para cada tipo
//         const typeString = typeDB.map((type) => type.name).join(", ");
        
//         // Crear un objeto combinando la información del Pokémon y los nombres de los tipos
//         const pokemonWithTypes = {
//           ...pokemonDB.toJSON(),
//           types: typeString,
//         };

//         return pokemonWithTypes;
//       } else {
//         return 'No se encontró información para el Pokémon con el ID proporcionado';
//       }
//     }
//   } catch (error) {
//     console.error('Error en el controlador de Pokémon por ID:', error);
//     throw error;
//   }
// };

// module.exports = {
//   pokemonIDController,
// };



