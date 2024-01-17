const { Type } = require('../db');
const axios = require('axios');

const allTypesController = async () => {
    try {
        // Obtengo types directamente desde la API
        const apiTypes = (await axios.get('https://pokeapi.co/api/v2/type')).data.results;
        
        // Limpio y preceso los types obtenidos
        const cleanTypes = new Set(); //Utiliza un conjunto para evitar duplicados

       //Itero sobre los types de la API y obtiene detalles adicionales
        for (const type of apiTypes) {
            const typeDetails = await axios.get(type.url);
            const typeName = typeDetails.data.name;
            cleanTypes.add(typeName);//Agrega el nombre del tipo al conjunto
        }

        // Verifica y guarda en la base de datos solo si el tipo no existe
        const typesToInsert = Array.from(cleanTypes).map((nameType) => ({
            name: nameType,
        }));

        //Itera sobre los types para verificar y guardar en la base de datos
        for (const type of typesToInsert) {
            const existingType = await Type.findOne({ where: { name: type.name } });

        //Si el type no existe en la base de datos, lo guarda
            if (!existingType) {
                await Type.create(type);
            }
        }

        //Obtiene los types actualizados de la base de datos
        const updatedDbTypes = await Type.findAll();

        //Devuelve los tipos actualizados
        return updatedDbTypes;

    } catch (error) {
        console.log(error);
        console.error('Error al obtener y guardar tipos de Pokémon:', error);
        throw error;
    }
};

module.exports = {
    allTypesController
};




// const { Type } = require('../db');
// const axios = require('axios');

// const allTypesController = async () => {
//     try {
//         const dbTypes = await Type.findAll()
//         const cleanTypes = new Set()

//         if(dbTypes.length === 0){
//             const apiData = (await axios.get('https://pokeapi.co/api/v2/pokemon/')).data.results 

//             for (const pokemon of apiData) {
//                 const pokemonDetails = await axios.get(pokemon.url);
//                 const types = pokemonDetails.data.types.map(type => type.type.name);

//                 types.forEach((typeName) => {
//                     cleanTypes.add(typeName);
//                 });
//             }
//         }

//         const typesOk = Array.from(cleanTypes).map((nameType) => ({
//             name: nameType,
//         }));

//         await Type.bulkCreate(typesOk);

//         const updatedDbTypes = await Type.findAll(); // Obtener los tipos actualizados de la base de datos
//         return updatedDbTypes;

//     } catch (error) {
//         console.log(error)
//         console.error('Error al obtener y guardar tipos de Pokémon:', error);
//         throw error;
//     }
// };

// module.exports = {
//     allTypesController
// };