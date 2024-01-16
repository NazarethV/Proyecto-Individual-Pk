
const { pokemonIDController } = require('../controllers/pokemonIDController')

//HAY QUE MANEJAR LA ASINCRONIA (Para poder utilizar promesas) (async | await) al tratar de invocar un controlador que a su vez invoca una fuente externa
const getPokemonID = async (req, res) => {
    try{
        const { id } = req.params //Saco el ID que viene por params
        console.log('id recibido en el handler', id)

        if(!id){
            return res.status(400).json({error: "ID no proporcionado en los parámetros de la ruta." })
        }

        const pokemonID = await pokemonIDController(id)
        return res.status(200).json(pokemonID)

    }catch(error){
        console.log(error)
        console.log(error.data)
        //res.status(500).json({error: error.message});
        res.status(500).json({ error: "Error interno del servidor."})
    }
}


module.exports = {
    getPokemonID
}
























