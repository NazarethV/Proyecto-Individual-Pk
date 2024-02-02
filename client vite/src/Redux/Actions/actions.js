import React from 'react'
import axios from "axios"

import {
    GET_POKEMONS,
    GET_POKEMON_ID,
    GET_POKEMON_NAME,
    GET_TYPES,
    GET_TYPE_NAME,
    FILTER_SOURCE,
    FILTER_TYPES,
    ORDER_ATTACK,
    ORDER_NAME,
    POST_POKEMON,
    SET_PAGE,
    RESET_FILTERS,

} from "./actions-types"


export const setPage = (numPage) => {
    return { type: SET_PAGE, payload: numPage }
}

//Obtengo todos los pokemons
export const getPokemons = () => {
    return async function (dispatch){
        const {data} = await axios.get('http://localhost:3001/pokemons/')

        dispatch({
            type: GET_POKEMONS,
            payload: data
        })
    }

}

// export const getNamePokemons = (name) => {
//     return async (dispatch) => {
//       try {
//         let { data } = await axios.get(`http://localhost:3001/pokemons?name=${name}`)
//         console.log('data en action en getNamePokemons: ', data)
//         return dispatch({ 
//             type: GET_POKEMON_NAME, 
//             payload: data
//         })

//     } catch (error) {
//         console.log(error);
//         console.log(error.message);
//       }
//     };
//   };
export const getNamePokemons = (name) => {
    return async (dispatch, getState) => {
      try {
        const { filterSource, filterType } = getState(); // Obtener los estados de filtro
        let { data } = await axios.get(`http://localhost:3001/pokemons?name=${name}`);

        // Aplicar los filtros sobre los resultados de la búsqueda por nombre
        data = data.filter(pokemon => {
            return (
                (filterSource === "All" || (filterSource === "Api" && !isNaN(pokemon.id)) || (filterSource === "Created" && isNaN(pokemon.id))) &&
                (filterType === "All" || pokemon.types.includes(filterType))
            );
        });

        return dispatch({ 
            type: GET_POKEMON_NAME, 
            payload: data
        });
    } catch (error) {
        console.log(error);
        console.log(error.message);
      }
    };
};



  
//Obtengo el detail por ID del pokemon
export const getPokemonID = (id) => {
    return async function (dispatch){
        try{
            let { data } = await axios.get(`http://localhost:3001/pokemons/${id}`)
            return dispatch({
                type: GET_POKEMON_ID,
                payload: data,
            })
        }catch(error){
            console.log(error)
            console.log(error.message)
        }
    }
}


//CREO POKEMONS
export const createPokemon = (data) => {
    return async function (dispatch) {
        try {
            const response = await axios.post('http://localhost:3001/pokemons/', data);
           
            alert(`El pokemon llamado "${response.data.name}" fue creado correctamente`);
            //return response;

            return dispatch({
                type: POST_POKEMON,
                payload: response.data,
            })

        } catch (error) {
            console.log('Error en la creación del Pokémon:', error);
            alert('Error al crear el Pokémon. Consulta la consola para más detalles.');
        }
    };
};


//Obtengo todos los types
export const getTypes = () => {
    return async (dispatch) => {
        try{
            const { data } = await axios.get('http://localhost:3001/types')
            return dispatch({
                type: GET_TYPES, 
                payload: data
            })

        }catch(error){
            console.log(error)
            console.error('Error fetching teams:', error.message);
            return error.message;
        }
    }
}


//Filtro obtenido por DB o en API
export const filterBySource = (source) => {
    return async function(dispatch){
        try{
            dispatch({
                type: FILTER_SOURCE,
                payload: source
            })
        }catch(error){
            console.log(error)
            alert(error.response.data.error)
        }
    }
}


//Filtro por types
export const filterByType = (type) => {
    return async function(dispatch){
        try{
            dispatch({
                type: FILTER_TYPES,
                payload: type
            })
        }catch(error){
            console.log(error)
            alert(error.response.data.error)
        }
    }

}


//ORDENAMIENTO POR NOMBRE (ALFABETICO en el HOME)
// ascendente y descendente
export const sortByName = (order) => {
    return{
        type: ORDER_NAME,
        payload: order
    }
}


//Ordenamiento por attack
export const sortByAttack = (order) => {
    return{
        type: ORDER_ATTACK,
        payload: order
    }
}


export const resetFilters = () => ({
    type: RESET_FILTERS,
});














