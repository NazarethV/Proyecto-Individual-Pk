
const { createPokemonController } = require('../controllers/createPokemonController')

const postPokemon = async (req, res) => {
    try{
        const { name, image, hp, attack, defense, speed, height, weight } = req.body

        const newPokemon = await createPokemonController(
            name,
            image,
            hp, 
            attack, 
            defense, 
            speed, 
            height, 
            weight
        )

        res.status(201).json(newPokemon)

    }catch(error){
        if (
            error.message === "The pokemon already exists" ||
            error.message === "The pokemon must have at least one team"
        ) {
            console.error(error.message);
            res.status(409).json({ error: error.message });
        } else {
            console.error(error.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}



module.exports = { postPokemon}
