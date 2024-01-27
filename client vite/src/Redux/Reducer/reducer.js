
// import {
//     GET_POKEMONS,
//     GET_POKEMON_ID,
//     GET_POKEMON_NAME,
//     GET_TYPES,
//     GET_TYPE_NAME,
//     FILTER_TYPES,
//     FILTER_SOURCE,
//     ORDER_NAME,
//     ORDER_ATTACK,
//     RESET_FILTERS
// } from '../Actions/actions-types'

// //export const ITEMS_PER_PAGE = 12


// const initialState = {
//     allPokemons: [],
//     allPokemonsBackUp: [],
   
//     pokemonId: {},

//     allTypes: [],

//     filteredPokemons: [],// Nuevo estado para almacenar los Pokémon filtrados
//     filterType: " ",
//     filterSource: " ",
//     order: " ",

//     // Agrega un campo para almacenar el tipo de ordenamiento actual
//     currentSort: null,//Ordenamiento

//     currentPage: 0,

// }


// const rootReducer = (state = initialState, action) => {

//     switch(action.type){
//         case GET_POKEMONS:
//             return {
//                 ...state,
//                 allPokemons: action.payload,
//                 allPokemonsBackUp: action.payload
//             };

//         case GET_POKEMON_ID:
//             return {
//                 ...state,
//                 pokemonId: action.payload,
//             };


//         case GET_POKEMON_NAME:
//             return {
//                 ...state,
//                 allPokemons: action.payload
//             }
       
   
//         case GET_TYPES:
//             return {
//                 ...state,
//                 allTypes: action.payload,
//             };



//         case FILTER_SOURCE:
//             if (action.payload) {
//             let source = [];
//             //const pokemonsFiltrar = state.filteredPokemons.length ? state.filteredPokemons : state.allPokemonsBackUp

//             if (action.payload === 'All') {
//                 //source = pokemonsFiltrar
//                 source = state.allPokemonsBackUp;
//             } else if (action.payload === 'Api') {
//                 //source = pokemonsFiltrar.filter((pokemon) => !isNaN(pokemon.id))
//                 source = state.allPokemonsBackUp.filter((pokemon) => !isNaN(pokemon.id));
            
//             } else { 
//                 //source = pokemonsFiltrar.filter((pokemon) => isNaN(pokemon.id))
//                 source = state.allPokemonsBackUp.filter((pokemon) => isNaN(pokemon.id));
//             }


//             return {
//                 ...state,
//                 filteredPokemons: source,
//                 filterSource: action.payload
//             };
//         }

//         // case FILTER_SOURCE:
//         //     if (action.payload) {
//         //         let source = [];
//         //         if (action.payload === 'All') {
//         //             source = state.allPokemonsBackUp;
//         //         } else if (action.payload === 'Api') {
//         //             source = state.allPokemonsBackUp.filter((pokemon) => !isNaN(pokemon.id));
//         //         } else { 
//         //             source = state.allPokemonsBackUp.filter((pokemon) => isNaN(pokemon.id));
//         //         }
//         //         const filteredByType = state.filter ? state.filteredPokemons : state.allPokemonsBackUp;
//         //         return {
//         //             ...state,
//         //             filteredPokemons: filterByType(source, filteredByType),
//         //             filter: true
//         //         };
//         //     }



//     case FILTER_TYPES:
//         if (action.payload) {
//             let filterTypes = [];
            
    
//             if (action.payload === 'All') {
//                 //filterTypes = pokemonsFiltrar
//                 filterTypes = state.allPokemonsBackUp;
//             } else {

//                 //filterTypes = pokemonsFiltrar.filter((p) =>
//                 filterTypes = state.allPokemonsBackUp.filter((p) =>
//                     p.types.includes(action.payload)
//                 );
//             }


//             return {
//                 ...state,
//                 filteredPokemons: filterTypes,
//                 filterTypes: action.payload,
//             };
//         }

//         // case FILTER_TYPES:
//         //     if (action.payload) {
//         //         const filterByType = (source, type) => {
//         //             if (action.payload === 'All') {
//         //                 return source;
//         //             } else {
//         //                 return source.filter((p) => p.types.includes(action.payload));
//         //             }
//         //         };
//         //         const filterSource = state.filter ? state.filteredPokemons : state.allPokemonsBackUp;
//         //         return {
//         //             ...state,
//         //             filteredPokemons: filterByType(filterSource, state.allPokemonsBackUp),
//         //             filter: true,
//         //         };
//         //     }


//     case ORDER_NAME:
//         let sortedPokemonsByName = [...state.filteredPokemons];
    
//         sortedPokemonsByName.sort((a, b) => {
//             const nameA = a.name.toLowerCase();
//             const nameB = b.name.toLowerCase();
    
//             if (action.payload === 'asc') {
//                 return nameA.localeCompare(nameB);
//             } else {
//                 return nameB.localeCompare(nameA);
//             }
//         });
    
//         return {
//             ...state,
//             filteredPokemons: sortedPokemonsByName,

           
//         };



//         case ORDER_ATTACK:
//             let sortedPokemonsByAttack = [...state.filteredPokemons];
        
//             if (action.payload === 'min') {
//                 sortedPokemonsByAttack.sort((a, b) => a.attack - b.attack);
//             } else if (action.payload === 'max') {
//                 sortedPokemonsByAttack.sort((a, b) => b.attack - a.attack);
//             }
        
//             return {
//                 ...state,
//                 filteredPokemons: sortedPokemonsByAttack,

//             };


//         default:
//             return state;
//            // return ...state;
//     }
// };



// export default rootReducer;



import {
    GET_POKEMONS,
    GET_POKEMON_ID,
    GET_POKEMON_NAME,
    GET_TYPES,
    FILTER_TYPES,
    FILTER_SOURCE,
    ORDER_NAME,
    ORDER_ATTACK,
    RESET_FILTERS
  } from '../Actions/actions-types';
  
  const initialState = {
    allPokemons: [],
    allPokemonsBackUp: [],
    pokemonId: {},
    allTypes: [],
    filteredPokemons: [],
    filterSource: "All", // Estado para almacenar el filtro de origen seleccionado
    filterType: "All", // Estado para almacenar el filtro de tipo seleccionado
    currentPage: 0,
  };
  
  const rootReducer = (state = initialState, action) => {
    switch(action.type) {
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
        };
  
      case GET_TYPES:
        return {
          ...state,
          allTypes: action.payload,
        };
  
    //   case FILTER_SOURCE:
    //     let filteredData = [];
    //     if (action.payload === 'All') {
    //       filteredData = state.allPokemonsBackUp;
    //     } else if (action.payload === 'Api') {
    //       filteredData = state.allPokemonsBackUp.filter((pokemon) => !isNaN(pokemon.id));
    //     } else if (action.payload === 'Created') {
    //       filteredData = state.allPokemonsBackUp.filter((pokemon) => isNaN(pokemon.id));
    //     }
    //     return {
    //       ...state,
    //       filteredPokemons: filteredData,
    //       filterSource: action.payload
    //     };
  

    case FILTER_SOURCE:
        const sourceFilter = action.payload;
        let filteredBySource = state.allPokemonsBackUp;
        if (sourceFilter !== "All") {
          filteredBySource = state.allPokemonsBackUp.filter((pokemon) =>
            sourceFilter === "Api" ? !isNaN(pokemon.id) : isNaN(pokemon.id)
          );
        }
        return {
          ...state,
          filteredPokemons: filteredBySource.filter((pokemon) =>
            state.filterType === "All" ? true : pokemon.types.includes(state.filterType)
          ),
          filterSource: sourceFilter,
        };

        case FILTER_TYPES:
            const typeFilter = action.payload;
            return {
              ...state,
              filteredPokemons: state.allPokemonsBackUp.filter((pokemon) =>
                state.filterSource === "All"
                  ? true
                  : state.filterSource === "Api"
                  ? !isNaN(pokemon.id)
                  : isNaN(pokemon.id)
              ).filter((pokemon) => typeFilter === "All" ? true : pokemon.types.includes(typeFilter)),
              filterType: typeFilter,
            };
  
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
    }
  };
  
  export default rootReducer;







