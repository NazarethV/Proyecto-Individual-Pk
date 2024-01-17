const { Pokemon, Type } = require('../db');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

const createPokemonController = async (
    name, image, hp, attack, defense, speed, height, weight, types
) => {
    console.log('types llega así: ', types)
    try {
        const [pokemon, created] = await Pokemon.findOrCreate({
            where: { name },
            defaults: {
                name,
                image,
                hp,
                attack,
                defense,
                speed,
                height,
                weight,
                types
            }
        });
        
        if (!created) throw new Error("Este Pokemon ya existe ");

        // Añadir los tipos al Pokemon después de crearlo
        //const typesDB = await Type.findAll({ where: { name: { [Op.in]: types } } });
        // if (!types || !Array.isArray(types)) {
        //     throw new Error('Invalid types provided');
        //   }
          
        const typesDB = await Type.findAll({ where: { name: types } });
        
          
        pokemon.addTypes(typesDB);

        // Recuperar el Pokémon con los tipos asociados
        // const updatedPokemon = await Pokemon.findByPk(pokemon.id, {
        //     include: [
        //         {
        //             model: Type,
        //             as: 'Types',
        //             attributes: ['id', 'name'],
        //             through: {
        //                 attributes: [],
        //             },
        //         },
        //     ],
        // });

        //return updatedPokemon;
        return pokemon
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}

module.exports = {
    createPokemonController
}






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