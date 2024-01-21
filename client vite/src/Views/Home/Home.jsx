import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Pokemons from '../../Components/Cards/Pokemons'
import { getPokemons, getPokemonID, getNamePokemons ,getTypes, filterCreated, filterType } from '../../Redux/Actions/actions'

const Home = () => {
    const dispatch = useDispatch()

    const allPokemons = useSelector((state) => state.allPokemons)
    const types = useSelector((state) => state.types)
    const allPokemonsBackUp = useSelector((state) => state.allPokemonsBackUp)

    //Ciclo de vida de los componentes:
    useEffect(() => {//Se activan estas funciones que mandan su info al reducer, cuando se activa este componente
        dispatch(getPokemons())//Activa a la funcion que trae a todos los pokemons (en actions)
        dispatch(getTypes())
    }, [allPokemonsBackUp, dispatch])


    const handleFilterType = (event) => {
        //Obtengo el valor seleccionado del filtro de type
        const selectedValue = event.target.value
        console.log('el valor recibido es: ', selectedValue)

        //Luego envía el valor al store de Redux
        dispatch(filterType(selectedValue))
    }


  return (
    <div>
        <h1>HOMEE</h1>

        <div>
        <h4>Filtros</h4>
        <select
            onChange={(e) => handleFilterType(e)}
            name='types'
        >
            <option value='' disabled>
                Seleccione type
            </option>

            <option value='todos'>
                Todos
            </option>

            {types?.map((type) => (
                <option key={type.id} value={type.name}>
                    {type.name}
                </option>
            ))}

        </select>
        
    </div>

    {/*A las Cards le paso la info de todos los pokemons */}
    <Pokemons allPokemons={allPokemons} />
    </div>
  )
}

export default Home