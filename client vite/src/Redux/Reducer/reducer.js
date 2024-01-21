import {
    GET_POKEMONS,
    GET_POKEMON_ID,
    GET_POKEMON_NAME,
    GET_TYPES,
    GET_TYPE_NAME,
    FILTER_TYPES,
    FILTER_CREATED,
    ORDER_NAME,
    ORDER_ATTACK,
    ORDER_HP,
    RESET_FILTERS
} from '../Actions/actions-types'

export const ITEMS_PER_PAGE = 8


const initialState ={
    allPokemons: [],
    allPokemonsBackUp: [],
    //pokemonId: [],
    pokemonId: {},

    allTypes: [],

    pokemonsFiltered: [],
    filter: false,

    currentPage: 0
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
            if(action.payload.error){
                return {
                    ...state,
                    allPokemons: [],
                    notFound: true,
                }
            }else{
                return {
                    ...state,
                    allPokemons: action.payload,
                    notFound: false,
                }
            }
            // return {
            //     ...state,
            //     allPokemons: action.payload,
            //     allPokemonsBackUp: action.payload
            // };

        case GET_TYPES:
            return {
                ...state,
                allTypes: action.payload,
            };

        case FILTER_CREATED:
            let filteredPokemons = [...state.allPokemons]
            if(action.payload === 'created'){
                filteredPokemons = state.allPokemonsBackUp.filter((pokemon) => isNaN(pokemon.id))
            
            }else if(action.payload === 'api'){
                filteredPokemons = state.allPokemonsBackUp.filter((pokemon) => !isNaN(pokemon.id))
            
            }else{
                filteredPokemons = state.allPokemonsBackUp
            }
            console.log("filtrado", filteredPokemons)
            return{
                ...state,
                allPokemons: filteredPokemons
            }

        case FILTER_TYPES:
            let filterType;
            if(action.payload === "All"){
                filterType = state.allPokemons
            
            }else{
                filterType = state.allPokemonsBackUp.filter((e) =>
                    e.types.includes(action.payload)
                )
            }
            return {
                ...state,
                allPokemons: filterType,
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

        case ORDER_HP:
            let sortedHp = [...state.allPokemons]

            if(action.payload === "min"){
                sortedHp.sort((a, b) => a.hp - b.hp)
            }
            if(action.payload === "max"){
                sortedHp.sort((a, b) => b.hp - a.hp)
            }
            return {
                ...state,
                allPokemons: sortedHp
            }


        default:
            return state;
    }
};



export default rootReducer;











