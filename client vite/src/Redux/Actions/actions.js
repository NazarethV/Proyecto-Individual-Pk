import React from 'react'
import axios from "axios"

import {
    GET_POKEMONS,
    GET_POKEMON_ID,
    GET_POKEMON_NAME,
    GET_TYPES,
    GET_TYPE_NAME,
    FILTER_CREATED,
    FILTER_TYPES,
    ORDER_ATTACK,
    ORDER_HP,
    ORDER_NAME,
    POST_POKEMON
} from "./actions-types"

//Obtengo todos los pokemons
export const getPokemons = () => {
    return async function (dispatch){
        const {data} = await axios.get('http://localhost:3001/pokemons/')

        const pokemons = data;

        dispatch({
            type: GET_POKEMONS,
            payload: pokemons
        })
    }

}

//Obtengo pokemon por nombre
export const getNamePokemons = (name) => {
    return async function (dispatch){
        try{
            let response = await axios.get(
                `http://localhost:3001/pokemons?name=${name}`)
            return dispatch({
                type: GET_POKEMON_NAME,
                payload: response.data
            })
            
        }catch(error){
            return dispatch({
                type: GET_NAME_POKEMONS,
                payload: { error: error },
            });
        }
    }
}

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
            return response;
        } catch (error) {
            console.log('Error en la creación del Pokémon:', error);
            alert('Error al crear el Pokémon. Consulta la consola para más detalles.');
        }
    };
};
// export const createPokemon = (data) => {
//     return async function(dispatch){
//         try{
//             const response = await axios.post('http://localhost:3001/pokemons/')
//             alert('El pokemon fue creado correctamente')

//             return dispatch({
//                 type: POST_POKEMON,
//                 payload: response.data,
//             })

//         }catch(error){
//             console.log(error)
//             alert(error.response.data.error)
//         }
//     }
//}


//Obtengo todos los types
export const getTypes = () => {
    return async (dispatch) => {
        try{
            const { data } = await axios.get('http://localhost:3001/types')
            return dispatch({type: GET_TYPES, payload: data})
        }catch(error){
            console.log(error)
            console.error('Error fetching teams:', error.message);
            return error.message;
        }
    }
}


//Filtro por obtenido por DB o en API
export const filterCreated = (payload) => {
    return{
        type: FILTER_CREATED,
        payload
    }
}


//Filtro por types
export const filterType = (payload) => {
    return{
        type: FILTER_TYPES,
        payload
    }
}


//ORDENAMIENTO POR NOMBRE (ALFABETICO en el HOME)
export const orderName = (payload) => {
    return{
        type: ORDER_NAME,
        payload
    }
}


//Ordenamiento por attack
export const orderAttack = (payload) => {
    return{
        type: ORDER_ATTACK,
        payload
    }
}


//Ordenamiento por HP
export const orderHp = (payload) => {
    return{
        type: ORDER_HP,
        payload
    }
}
















