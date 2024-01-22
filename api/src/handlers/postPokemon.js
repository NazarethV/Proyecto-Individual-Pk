
const { createPokemonController } = require('../controllers/createPokemonController')

const postPokemon = async (req, res) => {
    try{
        const { name, image, hp, attack, defense, speed, height, weight, types } = req.body

        console.log('Datos recibidos en postPokemon: ', req.body);

        const newPokemon = await createPokemonController(
            name,
            image,
            hp, 
            attack, 
            defense, 
            speed, 
            height, 
            weight,
            types
        )

        res.status(201).json(newPokemon)

    }catch(error){
        console.log(error)
        if (
            error.message === "The pokemon already exists" ||
            error.message === "The pokemon must have at least one team"
        ) {
            console.log(error)
            console.error(error.message);
            res.status(409).json({ error: error.message });
        } else {
            console.log(error)
            console.error(error.message);
            res.status(500).json({ error: error });
        }
    }
}



module.exports = { postPokemon}
