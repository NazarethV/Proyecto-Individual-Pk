import {
    GET_POKEMONS,
    GET_POKEMON_ID,
    GET_POKEMON_NAME,
    GET_TYPES,
    GET_TYPE_NAME,
    FILTER_TYPES,
    FILTER_SOURCE,
    ORDER_NAME,
    ORDER_ATTACK,
    RESET_FILTERS
} from '../Actions/actions-types'

//export const ITEMS_PER_PAGE = 12


const initialState = {
    allPokemons: [],
    allPokemonsBackUp: [],
   
    pokemonId: {},

    allTypes: [],

    pokemonsFiltered: [],
    filter: false,


    currentPage: 0,
}

const rootReducer = (state = initialState, action) => {

    switch(action.type){
        case GET_POKEMONS:
            return {
                ...state,
                allPokemons: action.payload,
                allPokemonsBackUp: action.payload
            };

        case GET_POKEMON_ID:
            return {
                ...state,
                pokemonId: action.payload,
            };


        case GET_POKEMON_NAME:
            return {
                ...state,
                allPokemons: action.payload
            }
       
   
        case GET_TYPES:
            return {
                ...state,
                allTypes: action.payload,
            };

        // case FILTER_SOURCE:
        //     let filteredPokemons = [...state.allPokemons]
        //     if(action.payload === 'created'){
        //         filteredPokemons = state.allPokemonsBackUp.filter((pokemon) => isNaN(pokemon.id))
            
        //     }else if(action.payload === 'api'){
        //         filteredPokemons = state.allPokemonsBackUp.filter((pokemon) => !isNaN(pokemon.id))
            
        //     }else{
        //         filteredPokemons = state.allPokemonsBackUp
        //     }
        //     console.log("filtrado", filteredPokemons)
        //     return{
        //         ...state,
        //         allPokemons: filteredPokemons
        //     }

        case FILTER_SOURCE:
            if(action.payload === 'all'){
                return {
                    ...state,
                    allPokemonsBackUp: state.allPokemons
                }
            }

            if(action.payload === 'created'){
                const createdPokemons = state.allPokemons?.filter((pokemon) => typeof pokemon.id === 'string')
                return {
                    ...state,
                    allPokemonsBackUp: createdPokemons
                }
            }

            if(action.payload === 'api'){
                const apiPokemons = state.allPokemons?.filter((pokemon) => typeof pokemon.id === 'number')
                return {
                    ...state,
                    allPokemonsBackUp: apiPokemons
                }
            }

        // case FILTER_TYPES:
        //     let filterType;
        //     if(action.payload === "All"){
        //         filterType = state.allPokemons
            
        //     }else{
        //         filterType = state.allPokemonsBackUp.filter((e) =>
        //             e.types.includes(action.payload)
        //         )
        //     }
        //     return {
        //         ...state,
        //         allPokemons: filterType,
        //     }

        case FILTER_TYPES:
            return {
                ...state,
                filteredPokemons: state.allPokemons.filter((pokemon) =>
                    allPokemons.type.includes(action.payload)
                )
            }
            
        case ORDER_NAME:
            let sortAll = action.payload === "asc"
                ? state.allPokemons.sort((a, b) => {
                    if(a.name > b.name){
                        return 1
                    }
                    if(b.name > a.name){
                        return -1
                    }
                    return 0;
                })
                : state.allPokemons.sort((a, b) => {
                    if(a.name > b.name){
                        return -1
                    }
                    if(b.name > a.name){
                        return 1
                    }
                    return 0
                })
                return {
                    ...state,
                    allPokemons: sortAll
                };

        case ORDER_ATTACK:
            let sortedAttack = [...state.allPokemons]

            if(action.payload === "min"){
                sortedAttack.sort((a, b) => a.attack - b.attack)
            }
            if(action.payload === "max"){
                sortedAttack.sort((a, b) => b.attack - a.attack)
            }
            return {
                ...state,
                allPokemons: sortedAttack
            };


        default:
            return state;
           // return ...state;
    }
};



export default rootReducer;











