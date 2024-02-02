const { Pokemon, Type } = require('../db');
const { getPokemonDataFromApi } = require('../utils/pokemonApi');

const allPokemonsController = async () => {
  try {
    const pokemonDB = await Pokemon.findAll({
      include: [
        {
          model: Type,
          as: 'Types',
          attributes: ['name'],
          through: {
            attributes: [],
          },
        },
      ],
    });

    const pokemonApi = await getPokemonDataFromApi();

    // Transformar la estructura de los tipos de la base de datos
    const transformedPokemonDB = pokemonDB.map((pokemon) => {
      // Utiliza la propiedad "Types" directamente y extrae los nombres
      const typesFromDB = pokemon.Types.map((type) => type.name);
      
      // Elimina la propiedad "Types" y utiliza solo "types"
      const { Types, ...pokemonWithoutTypes } = pokemon.toJSON();

      return {
        ...pokemonWithoutTypes,
        types: typesFromDB,
      };
    });

    return [...transformedPokemonDB, ...pokemonApi];

  } catch (error) {
    console.error('Error en allPokemonsController:', error);
    throw error;
  }
};

module.exports = {
    allPokemonsController,
  };

