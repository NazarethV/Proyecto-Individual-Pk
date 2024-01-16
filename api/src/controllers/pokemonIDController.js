const axios = require('axios');
const { Pokemon, Type, PokemonType } = require('../db');
const { getPokemonDataFromApi } = require('../utils/pokemonApi');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

const pokemonIDController = async (id) => {
  console.log('Id recibido: ', id);

  if (!id || isNaN(id)) {
    return 'ID no válido';
  }

  try {
    if (!isNaN(id)) {
      // Obtener datos de la API de Pokémon utilizando la utilidad
      const allPokemonApi = await getPokemonDataFromApi();

      // Buscar el Pokémon por ID en los datos obtenidos
      const pokemonID = allPokemonApi.find((pokemon) => pokemon.id === parseInt(id));

      if (pokemonID) {
        return pokemonID;
      } else {
        return 'No se encontró información para el Pokémon con el ID proporcionado';
      }


    }else{
        const pokemonDB = await Pokemon.findOne({
            where: { id: id},
        });

        if(pokemonDB){
            const pokemonTypes = await PokemonType.findAll({
                where: { PokemonId: pokemonDB.id},
            });

            const typeIds = pokemonTypes.map((type) => type.TypeId)
            const typeDB = await Type.findAll({
                where: { id: {[Op.in]: typeIds}},
            });

            return typeDB;
        }else{
            return "No se encontró información para el pokemon con ID proporcionado"   
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