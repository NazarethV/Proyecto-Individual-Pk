
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
    APPLY_FILTERS_AND_ORDER,
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
    orderBy: ' ',
    orderDirection: ' ',  
    currentPage: 0,
  };
  

  // Función para filtrar los pokemons
const filterPokemons = (pokemons, filterSource, filterType) => {
  return pokemons.filter((pokemon) => {
    if (filterSource === "All") {
      return true;
    } else if (filterSource === "Api") {
      return !isNaN(pokemon.id);
    } else if (filterSource === "Created") {
      return isNaN(pokemon.id);
    }
  }).filter((pokemon) => {
    return filterType === "All" ? true : pokemon.types.includes(filterType);
  });
};

// Función para ordenar los pokemons
const sortPokemons = (pokemons, orderBy, orderDirection) => {
  return [...pokemons].sort((a, b) => {
    if (orderBy === "name") {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      return orderDirection === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    } else if (orderBy === "attack") {
      return orderDirection === "asc" ? a.attack - b.attack : b.attack - a.attack;
    }
  });
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
  
     
      // case FILTER_SOURCE:
      //   const sourceFilter = action.payload;

      //   const filteredBySource = state.allPokemonsBackUp.filter((pokemon) => {
      //     if (sourceFilter === "All") {
      //       return true; // Devuelve todos los pokemons si el filtro es "All"
      //     } else if (sourceFilter === "Api") {
      //       return !isNaN(pokemon.id); // Devuelve los pokemons de la API
      //     } else {
      //       return isNaN(pokemon.id); // Devuelve los pokemons de la Base de Datos
      //     }
      //   });

        // const filteredByTypeAndSource = filteredBySource.filter((pokemon) => {
        //   if (state.filterType === "All") {
        //     return true; // Si el filtro de tipo es "All", devuelve todos los pokemons
        //   } else {
        //     return pokemon.types.includes(state.filterType); // Devuelve pokemons con el tipo seleccionado
        //   }
        // });

        //Para combinar completamente con los ordenamientos
        // Ordenar los pokemons después de aplicar los filtros
      //   const sortedPokemons = sortPokemons(filteredByTypeAndSource, state.orderBy, state.orderDirection);

      //   return {
      //     ...state,
      //     //filteredPokemons: filteredByTypeAndSource,
      //     filteredPokemons: sortedPokemons,
      //     filterSource: sourceFilter,
      // };
  

      case FILTER_SOURCE:
      return {
        ...state,
        filterSource: action.payload,
      };


        // case FILTER_TYPES:
        //   const typeFilter = action.payload;

        //   const filteredByType = state.allPokemonsBackUp.filter((pokemon) => {
        //     if (typeFilter === "All") {
        //       return true; // Devuelve todos los pokemons si el filtro de tipo es "All"
        //     } else {
        //       return pokemon.types.includes(typeFilter); // Devuelve pokemons con el tipo seleccionado
        //     }
        //   });

        //   const filteredBySourceAndType = filteredByType.filter((pokemon) => {
        //     if (state.filterSource === "All") {
        //       return true; // Si el filtro de source es "All", devuelve todos los pokemons
        //     } else if (state.filterSource === "Api") {
        //       return !isNaN(pokemon.id); // Devuelve los pokemons de la API
        //     } else {
        //       return isNaN(pokemon.id); // Devuelve los pokemons de la Base de Datos
        //     }
        //   });

          //Para combinar los filtros con el ordenamiento
        //   const sortedPokemonsType = sortPokemons(filteredBySourceAndType, state.orderBy, state.orderDirection);
        
        //   return {
        //     ...state,
        //     //filteredPokemons: filteredBySourceAndType,
        //     filteredPokemons: sortedPokemonsType,
        //     filterType: typeFilter,
        // };


        case FILTER_TYPES:
          return {
            ...state,
            filterType: action.payload,
          };
        


  
      // case ORDER_NAME:
      //   let sortedPokemonsByName = [...state.filteredPokemons];
      //   sortedPokemonsByName.sort((a, b) => {
      //     const nameA = a.name.toLowerCase();
      //     const nameB = b.name.toLowerCase();
      //     if (action.payload === 'asc') {
      //       return nameA.localeCompare(nameB);
      //     } else {
      //       return nameB.localeCompare(nameA);
      //     }
      //   });

      //   //Combinar el ordenamiento con los filtros
      //   const sortedByName = sortPokemons(state.filteredPokemons, 'name', action.payload);

      //   return {
      //     ...state,
      //     // filteredPokemons: sortedPokemonsByName,
      //     filteredPokemons: sortedByName,
      //   };

      
  


      // case ORDER_ATTACK:
      //   let sortedPokemonsByAttack = [...state.filteredPokemons];
      //   if (action.payload === 'min') {
      //     sortedPokemonsByAttack.sort((a, b) => a.attack - b.attack);
      //   } else if (action.payload === 'max') {
      //     sortedPokemonsByAttack.sort((a, b) => b.attack - a.attack);
      //   }

      //   //Combinar el ordenamiento con los filtros
      //   const sortedByAttack = sortPokemons(state.filteredPokemons, 'attack', action.payload);

      //   return {
      //     ...state,
      //     //filteredPokemons: sortedPokemonsByAttack,
      //     filteredPokemons: sortedByAttack,
      //   };
      case ORDER_NAME:
      return {
        ...state,
        orderBy: 'name',
        orderDirection: action.payload,
      };

    // case ORDER_ATTACK:
    //   return {
    //     ...state,
    //     orderBy: 'attack',
    //     orderDirection: action.payload,
    //   };

    case ORDER_ATTACK:
  const orderedPokemons = [...state.filteredPokemons].sort((a, b) => {
    console.log(`Sorting ${a.name} (${a.attack}) and ${b.name} (${b.attack})`);
    if (action.payload === 'min') {
      return a.attack - b.attack; // Orden ascendente por ataque
    } else {
      return b.attack - a.attack; // Orden descendente por ataque
    }
  });

  console.log('Ordered Pokemons:', orderedPokemons);

  return {
    ...state,
    orderBy: 'attack',
    orderDirection: action.payload,
    filteredPokemons: orderedPokemons,
  };
  

    case APPLY_FILTERS_AND_ORDER:
      const filteredPokemons = filterPokemons(state.allPokemonsBackUp, state.filterSource, state.filterType);
      const sortedPokemons = sortPokemons(filteredPokemons, state.orderBy, state.orderDirection);

      return {
        ...state,
        filteredPokemons: sortedPokemons,
      };

      default:
        return state;
    }
  };
  
  export default rootReducer;







