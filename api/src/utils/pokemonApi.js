const axios = require('axios');
const URL_API = 'https://pokeapi.co/api/v2/pokemon/';


const getPokemonDataFromApi = async () => {
    try {
        const response = await axios.get(`${URL_API}`);
        const allApi = await Promise.all(response.data.results.map(async (pokemon) => {
            const pokemonDetails = await axios.get(pokemon.url);

            return {
                id: pokemonDetails.data.id,
                name: pokemonDetails.data.forms[0].name,
                image: pokemonDetails.data.sprites.other['official-artwork'].front_default,
                hp: pokemonDetails.data.stats[0].base_stat,
                attack: pokemonDetails.data.stats[1].base_stat,
                defense: pokemonDetails.data.stats[2].base_stat,
                speed: pokemonDetails.data.stats[5].base_stat,
                height: pokemonDetails.data.height,
                weight: pokemonDetails.data.weight,
                types: pokemonDetails.data.types.map((type) => type.type.name),
            };
        }));
        return allApi;
    } catch (error) {
        console.error('Error fetching data from Pokemon API:', error);
        throw error;
    }
};

module.exports = {
    getPokemonDataFromApi,
};


// const axios = require('axios');
// const URL_API = 'https://pokeapi.co/api/v2/pokemon/';
// const { Type } = require('../db');

// const saveUniqueTypesToDatabase = async (types) => {
//   // Conjunto para almacenar tipos únicos
//   const uniqueTypes = new Set(types);

//   // Convertir el conjunto a un array
//   const allUniqueTypes = Array.from(uniqueTypes);

//   // Crear registros en la tabla Type en la base de datos
//   const createdTypes = await Type.bulkCreate(allUniqueTypes.map((typeName) => ({ name: typeName })));

//   console.log('Types creados en la base de datos:', createdTypes);
// };


// const getPokemonDataFromApi = async () => {
//   try {
//     const response = await axios.get(`${URL_API}`);
//     const allApi = await Promise.all(response.data.results.map(async (pokemon) => {
//       const pokemonDetails = await axios.get(pokemon.url);
     
//        // Obtener los tipos de cada Pokémon
//        const types = pokemonDetails.data.types.map((type) => type.type.name);

//        // Guardar los tipos únicos en la base de datos
//        await saveUniqueTypesToDatabase(types);

//       return {
//         id: pokemonDetails.data.id,
//         name: pokemonDetails.data.forms[0].name,
//         image: pokemonDetails.data.sprites.other['official-artwork'].front_default,
//         hp: pokemonDetails.data.stats[0].base_stat,
//         attack: pokemonDetails.data.stats[1].base_stat,
//         defense: pokemonDetails.data.stats[2].base_stat,
//         speed: pokemonDetails.data.stats[5].base_stat,
//         height: pokemonDetails.data.height,
//         weight: pokemonDetails.data.weight,
//         types: pokemonDetails.data.types.map((type) => type.type.name),
//       };
//     }));
//     return allApi;
//   } catch (error) {
//     console.error('Error fetching data from Pokemon API:', error);
//     throw error;
//   }
// };

// module.exports = {
//   getPokemonDataFromApi,
// };


// const axios = require('axios')
// const URL_API = 'https://pokeapi.co/api/v2/pokemon/'


// const getPokemonDataFromApi  = async () => {

//     try{

//     const { data } = await axios.get(`${URL_API}`)
//     const allApi = data.map(pokemon => ({
//       id: pokemon.id,
//       name: pokemon.forms[0].name,
//       //accedo a la URL de la imagen oficial ("official artwork") desde la respuesta de la API, entrando en other
//       image: pokemon.sprites.other["official-artwork"].front_default,
//       hp: pokemon.stats[0].base_stat, //1-salud/vida
//       attack: pokemon.stats[1].base_stat, //2-ataque
//       defense: pokemon.stats[2].base_stat, //3-defensa
//       speed: pokemon.stats[5].base_stat, //6-velocidad
//       height: pokemon.height,
//       weight: pokemon.weight,
//       types: pokemon.types.map((types) => types.type.name),
//     }))

//     // return [...allApi]
//     return allApi
    

//   }catch(error){
//     console.error('Error fetching data from Pokemon API:', error);
//     throw error;
//   }
// }


// module.exports = {
//   getPokemonDataFromApi 
// }


