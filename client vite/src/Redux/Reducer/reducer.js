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


        case FILTER_SOURCE:
            if(action.payload){//Si el value de la opcion existe
                let source = []

                if(action.payload === 'All'){
                    source = state.allPokemonsBackUp

                }else if(action.payload === 'Api'){
                    source = state.allPokemonsBackUp.filter((pokemon) => !isNaN(pokemon.id))
                
                }else{
                    source = state.allPokemonsBackUp.filter((pokemon) => isNaN(pokemon.id))
                }

                return {
                    ...state,
                    allPokemons: source,
                    pokemonsFiltered: source,
                    filter: true
                }
            }


        case FILTER_TYPES:
            if (action.payload) {
            let filterTypes = [];

            if (action.payload === 'All') {
                filterTypes = state.allPokemonsBackUp;
            } else {
                filterTypes = state.allPokemonsBackUp.filter((p) =>
                    p.types.includes(action.payload) //En esta corrección, se utiliza p.types.includes(action.payload) para verificar si el tipo seleccionado está incluido en la matriz de tipos del Pokémon.
                );
            }

            return {
                ...state,
                allPokemons: filterTypes,
                pokemonsFiltered: filterTypes,
                filter: true,
            };
    }

            
        // case ORDER_NAME:
        //     let sortAll = action.payload === "asc"
        //         ? state.allPokemons.sort((a, b) => {
        //             if(a.name > b.name){
        //                 return 1
        //             }
        //             if(b.name > a.name){
        //                 return -1
        //             }
        //             return 0;
        //         })
        //         : state.allPokemons.sort((a, b) => {
        //             if(a.name > b.name){
        //                 return -1
        //             }
        //             if(b.name > a.name){
        //                 return 1
        //             }
        //             return 0
        //         })
        //         return {
        //             ...state,
        //             allPokemons: sortAll
        //         };

        case ORDER_NAME:
         let sortedPokemons = [...state.allPokemons]; // crea una copia de la matriz original

         sortedPokemons.sort((a, b) => {
         const nameA = a.name.toLowerCase();
         const nameB = b.name.toLowerCase();

         if (action.payload === "asc") {
            return nameA.localeCompare(nameB);//LOCALCOMPARE
        } else {
            return nameB.localeCompare(nameA);
        }
    });

    return {
        ...state,
        allPokemons: sortedPokemons,
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











