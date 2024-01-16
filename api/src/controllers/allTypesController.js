const { Type } = require('../db');
const axios = require('axios');

const allTypesController = async () => {
    try {
        const dbTypes = await Type.findAll()
        const cleanTypes = new Set()

        if(dbTypes.length === 0){
            const apiData = (await axios.get('https://pokeapi.co/api/v2/pokemon/')).data.results 

            for (const pokemon of apiData) {
                const pokemonDetails = await axios.get(pokemon.url);
                const types = pokemonDetails.data.types.map(type => type.type.name);

                types.forEach((typeName) => {
                    cleanTypes.add(typeName);
                });
            }
        }

        const typesOk = Array.from(cleanTypes).map((nameType) => ({
            name: nameType,
        }));

        await Type.bulkCreate(typesOk);

        const updatedDbTypes = await Type.findAll(); // Obtener los tipos actualizados de la base de datos
        return updatedDbTypes;

    } catch (error) {
        console.log(error)
        console.error('Error al obtener y guardar tipos de Pokémon:', error);
        throw error;
    }
};

module.exports = {
    allTypesController
};