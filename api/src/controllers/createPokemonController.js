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

