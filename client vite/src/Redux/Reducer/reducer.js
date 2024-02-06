
import {
  GET_POKEMONS,
  GET_POKEMON_ID,
  GET_POKEMON_NAME,
  GET_TYPES,
  DELETE_POKEMON,
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
  pokemonName: [],
  allTypes: [],
  filteredPokemons: [],
  filterSource: "All", // Estado para almacenar el filtro de origen seleccionado
  filterType: "All", // Estado para almacenar el filtro de tipo seleccionado


  sortAttack: null, // Cambiado a null
  sortName: null, // Cambiado a null

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
    // Aplicar filtros a los resultados de la búsqueda por nombre
    const filteredByName = action.payload.filter(pokemon => {
      return (  //FIJARME EXPLICACION DE ESTA PARTE (ESTO ES LO QUE HACE QUE FINALMENTE FUNCIONE TODO MI SEARCHBAR)
        (state.filterSource === "All" || (state.filterSource === "Api" && !isNaN(pokemon.id)) || (state.filterSource === "Created" && isNaN(pokemon.id))) &&
        (state.filterType === "All" || pokemon.types.includes(state.filterType))
      );
    });

    return {
      ...state,
      pokemonName: filteredByName,
    };


    case GET_TYPES:
      return {
        ...state,
        allTypes: action.payload,
      };


  case FILTER_SOURCE:
  const sourceFilter = action.payload;

  const filteredBySource = state.allPokemonsBackUp.filter((pokemon) => {
    if (sourceFilter === "All") {
      return true;
    } else if (sourceFilter === "Api") {
      return !isNaN(pokemon.id);
    } else {
      return isNaN(pokemon.id);
    }
  });

  const filteredByTypeAndSource = filteredBySource.filter((pokemon) => {
    if (state.filterType === "All") {
      return true;
    } else {
      return pokemon.types.includes(state.filterType);
    }
  });

  return {
    ...state,
    filteredPokemons: filteredByTypeAndSource,
    filterSource: sourceFilter,
    pokemonName: [], // Limpiar el estado de búsqueda por nombre al aplicar filtros
};

    


  case FILTER_TYPES:
  const typeFilter = action.payload;

  const filteredByType = state.allPokemonsBackUp.filter((pokemon) => {
    if (typeFilter === "All") {
      return true;
    } else {
      return pokemon.types.includes(typeFilter);
    }
  });

  const filteredBySourceAndType = filteredByType.filter((pokemon) => {
    if (state.filterSource === "All") {
      return true;
    } else if (state.filterSource === "Api") {
      return !isNaN(pokemon.id);
    } else {
      return isNaN(pokemon.id);
    }
  });

  return {
    ...state,
    filteredPokemons: filteredBySourceAndType,
    filterType: typeFilter,
    pokemonName: [], // Limpiar el estado de búsqueda por nombre al aplicar filtros
};



    case ORDER_NAME:
      let sortedPokemonsByName = state.filteredPokemons.length ? [...state.filteredPokemons] : [...state.allPokemonsBackUp];
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
        sortName: action.payload,
        sortAttack: null
      };


      
    case ORDER_ATTACK:
      let sortedPokemonsByAttack = state.filteredPokemons.length ? [...state.filteredPokemons] : [...state.allPokemonsBackUp];
      if (action.payload === 'min') {
        sortedPokemonsByAttack.sort((a, b) => a.attack - b.attack);
      } else if (action.payload === 'max') {
        sortedPokemonsByAttack.sort((a, b) => b.attack - a.attack);
      }
      return {
        ...state,
        filteredPokemons: sortedPokemonsByAttack,
        sortAttack: action.payload,
        sortName: null
      };

      
      case DELETE_POKEMON:
        const id = action.payload
        return {
          ...state,
          allPokemons: state.allPokemons.filter((pokemon) => pokemon.id !== id),
          filteredPokemons: state.allPokemonsBackUp.filter((pokemon) => pokemon.id !== id),
          allPokemonsBackUp: state.allPokemonsBackUp.filter((pokemon) => pokemon.id !== id),
        }


      case RESET_FILTERS:
          return {
            ...state,
            allPokemons: state.allPokemonsBackUp,
            filterSource: "All",
            filterType: "All",
            sortAttack: null,
            sortName: null,
            pokemonName: [],
            currentPage: 1 // Restablecer la página actual a 1 después del reset
          };

    default:
      return state;
  }
};

export default rootReducer;






