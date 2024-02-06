const { Pokemon } = require('../../db');

const deletePokemonController = async (id) => {
  try {
    // Intenta encontrar el Pokémon por su ID en la base de datos
    const pokemonToDelete = await Pokemon.findOne(
        { where: { 
            id: id } 
        });

    if (!pokemonToDelete) {
      return 'No se encontró el Pokémon con el ID proporcionado.';
    }

    // Elimina el Pokémon de la base de datos
    await pokemonToDelete.destroy();

    return 'Pokemon eliminado';
  } catch (error) {
    console.error('Error al eliminar el Pokémon:', error);
    throw error;
  }
};

module.exports = {
  deletePokemonController
};