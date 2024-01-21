import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemonID} from '../../Redux/Actions/actions'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

const Detail = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const pokemon = useSelector((state) => state.pokemonId)

    useEffect(() => {
        dispatch(getPokemonID(id))
    }, [id])


  return (
    <div>
        
        <h2>{ pokemon?.name}</h2>
        <h2>{pokemon?.attack}</h2>
        <h2>{pokemon?.defense}</h2>
        <img src={pokemon?.image} alt={driver?.name}/>
        <h2>AGREGAR TODOS</h2>

    </div>
  )
}

export default Detail