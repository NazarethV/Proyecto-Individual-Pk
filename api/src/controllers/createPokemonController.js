const { Pokemon, Type } = require('../db');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;


const createPokemonController = async (
    name, image, hp, attack, defense, speed, height, weight, types
) => {
    try {
        // Verificar si el Pokémon ya existe por nombre
        const existingPokemon = await Pokemon.findOne({
            where: {
                name: { [Op.iLike]: name }
            }
        });

        if (existingPokemon) {
            throw new Error('The pokemon already exists');
        }

        if (!types || types.length === 0) {
            throw new Error('The pokemon must have at least one type');
        }

        // Crear el nuevo Pokémon sin asociar tipos por ahora
        const newPokemon = await Pokemon.create({
            name,
            image,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
        });

        // Obtener instancias de tipos y establecer la asociación directamente
        const typesDB = await Type.findAll({ where: { name: types } });

        if (!typesDB || typesDB.length === 0) {
            throw new Error('Invalid types provided');
        }

        // Asociar el nuevo Pokémon con los tipos encontrados
        await newPokemon.setTypes(typesDB, { through: 'PokemonType' });

        return newPokemon;

    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

module.exports = {
   createPokemonController
}

// const createPokemonController = async (
//     name, image, hp, attack, defense, speed, height, weight, types
// ) => {
//     console.log('types llega así: ', types)
//     try {
//         const existingPokemon = await Pokemon.findOne({
//             where: {
//                 name: {[Op.iLike]: name}
//             }
//         })

//         if(existingPokemon){
//             throw new Error('The pokemon already exists')
//         }

//         if(!types || types.length === 0){//Si types no existe o esta vacio
//             throw new Error('The pokemon must have at least one type')

//         }

//         //
//         // const [pokemon, created] = await Type.findOrCreate({
//         //     where:{ name },
//         //     defaults: {
//         //         name, image, attack, defense, speed, height, weight, hp, types
//         //     }
//         // })

//         const pokemon = await Pokemon.create({
//             name,
//             image,
//             hp,
//             attack,
//             defense,
//             speed,
//             height,
//             weight,
//           });

//         // if(!created) throw new Error("Este Pokemon ya existe en la Base de Datos");

//         // const typesDB = await Type.findAll({ where: {name: types} })

//         // pokemon.addTypes(typesDB);

//         // return pokemon;

//         const typesDB = await Type.findAll({ where: { name: types } });
//         await pokemon.setTypes(typesDB);

//         return pokemon;


//     } catch (error) {
//         console.log(error);
//         throw new Error(error.message);
//     }
// }

// module.exports = {
//     createPokemonController
// }

// const { Pokemon, Type } = require('../db')
// const { Sequelize } = require('sequelize')
// const Op = Sequelize.Op

// const createPokemonController = async (
//     name, image, hp, attack, defense, speed, height, weight, type
// ) =>{
//     try{
//         const existingPokemon = await Pokemon.findOne({
//             where: {
//                 name: { [Op.iLike]: name}
//             }
//         })

//         if(existingPokemon){//Si ya existe el pokemon
//             throw new Error('The pokemon already exists')
//         }

//         if(!type || type.length === 0){//Si type no existe o está vacio
//             throw new Error('The pokemon must have at least one team')
//         }

//         console.log('Type antes de findOrCreate:', type);

//         // Obtén el type asociado o crea uno nuevo si no existe
//         const [types, created] = await Type.findOrCreate({
//             where: { type: type.toLowerCase() }
//         })

//         console.log('Types después de findOrCreate:', types);

//         //Metodo 'create' => es de sequelize para crear en este caso dentro de la tabla Pokemon de la base de datos
//         const newPokemon = await Pokemon.create(
//             { name, image, hp, attack, defense, speed, height, weight }
//         )

//         await newPokemon.addType(types[0])

//         return newPokemon

//     }catch(error){
//         console.log(error)
//         console.log(error.message)
//         throw new Error(error.message);
//     }
    
// }


// module.exports = {
//     createPokemonController
// }