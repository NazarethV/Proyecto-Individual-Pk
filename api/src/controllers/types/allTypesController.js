const { Type } = require('../../db');
const axios = require("axios");

const allTypesController = async () => {
    let allTypes = [];

    const infoApi = await axios.get("https://pokeapi.co/api/v2/type");
    const resultApi = await infoApi.data.results;

    resultApi.map((pokemon) => allTypes.push(pokemon.name));

    await Promise.all(
        allTypes.map((type) => Type.findOrCreate({ where: {name: type} }))
    );

    const typesDb = await Type.findAll();
    return typesDb

}

module.exports = {allTypesController}
