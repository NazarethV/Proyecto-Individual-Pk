
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

    filteredPokemons: [],// Nuevo estado para almacenar los Pokémon filtrados
    filter: false,

    // Agrega un campo para almacenar el tipo de ordenamiento actual
    currentSort: null,//Ordenamiento

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



        case FILTER_SOURCE:
            if (action.payload) {
            let source = [];

            if (action.payload === 'All') {
                source = state.allPokemonsBackUp;
            } else if (action.payload === 'Api') {
                source = state.allPokemonsBackUp.filter((pokemon) => !isNaN(pokemon.id));
            } else {
                source = state.allPokemonsBackUp.filter((pokemon) => isNaN(pokemon.id));
            }


            return {
                ...state,
                filteredPokemons: source,
                filter: true
            };
        }


    case FILTER_TYPES:
        if (action.payload) {
            let filterTypes = [];
    
            if (action.payload === 'All') {
                filterTypes = state.allPokemonsBackUp;
            } else {
                filterTypes = state.allPokemonsBackUp.filter((p) =>
                    p.types.includes(action.payload)
                );
            }


            return {
                ...state,
                filteredPokemons: filterTypes,
                filter: true,
            };
    }



    case ORDER_NAME:
        let sortedPokemonsByName = [...state.filteredPokemons];
    
        sortedPokemonsByName.sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
    
            if (action.payload === 'asc') {
                return nameA.localeCompare(nameB);
            } else {
                return nameB.localeCompare(nameA);
            }
        });
    
        return {
            ...state,
            filteredPokemons: sortedPokemonsByName,

           
        };



        case ORDER_ATTACK:
            let sortedPokemonsByAttack = [...state.filteredPokemons];
        
            if (action.payload === 'min') {
                sortedPokemonsByAttack.sort((a, b) => a.attack - b.attack);
            } else if (action.payload === 'max') {
                sortedPokemonsByAttack.sort((a, b) => b.attack - a.attack);
            }
        
            return {
                ...state,
                filteredPokemons: sortedPokemonsByAttack,

            };


        default:
            return state;
           // return ...state;
    }
};



export default rootReducer;











