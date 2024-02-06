const { allPokemonsController } = require('../../controllers/pokemons/allPokemonsController')
const { pokemonNameController } = require('../../controllers/pokemons/pokemonNameController')

//Este lo utilizo para traer por name y traer todos --> los 2 juntos porq por query no cambia de ruta
const getPokemons = async(req, res) => {
    try{
        const { name } = req.query

        if(name){//mostrar por nombre
            const namePokemon = await pokemonNameController(name)
            return res.status(200).json(namePokemon)
        
        }else{//mostrar todos
            const allPokemons = await allPokemonsController()
            return res.status(200).json(allPokemons)
        }

    }catch(error){
        console.log(error)
        console.log(error.message)
        res.status(400).json({error: error.message});
    }
}


module.exports = {
    getPokemons
}





