const { deletePokemonController } = require('../../controllers/pokemons/deletePokemonController');

const deletePokemonID = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID no proporcionado en los parámetros de la ruta." });
    }

    const result = await deletePokemonController(id);

    if (result === 'Pokemon eliminado') {
      return res.status(200).json({ message: "El Pokémon ha sido eliminado correctamente." });
    } else {
      return res.status(404).json({ error: result });
    }
  } catch (error) {
    console.error('Error al eliminar el Pokémon:', error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

module.exports = {
  deletePokemonID
};