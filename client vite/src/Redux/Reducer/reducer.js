
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

  // sortAttack:"",
  // sortName:"",
  sortAttack: null, // Cambiado a null
  sortName: null, // Cambiado a null

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



    case FILTER_SOURCE:
      const sourceFilter = action.payload;

      const filteredBySource = state.allPokemonsBackUp.filter((pokemon) => {
        if (sourceFilter === "All") {
          return true; // Devuelve todos los pokemons si el filtro es "All"
        } else if (sourceFilter === "Api") {
          return !isNaN(pokemon.id); // Devuelve los pokemons de la API
        } else {
          return isNaN(pokemon.id); // Devuelve los pokemons de la Base de Datos
        }
      });

      const filteredByTypeAndSource = filteredBySource.filter((pokemon) => {
        if (state.filterType === "All") {
          return true; // Si el filtro de tipo es "All", devuelve todos los pokemons
        } else {
          return pokemon.types.includes(state.filterType); // Devuelve pokemons con el tipo seleccionado
        }
      });

      


      return {
        ...state,
        filteredPokemons: filteredByTypeAndSource.length !== false ? filteredByTypeAndSource : [],//Para que no renderice nada, si no se encuentran coincidencias
        //filteredPokemons: filteredByTypeAndSource,
        filterSource: sourceFilter,
    };



      case FILTER_TYPES:
        const typeFilter = action.payload;

        const filteredByType = state.allPokemonsBackUp.filter((pokemon) => {
          if (typeFilter === "All") {
            return true; // Devuelve todos los pokemons si el filtro de tipo es "All"
          } else {
            return pokemon.types.includes(typeFilter); // Devuelve pokemons con el tipo seleccionado
          }
        });

        const filteredBySourceAndType = filteredByType.filter((pokemon) => {
          if (state.filterSource === "All") {
            return true; // Si el filtro de source es "All", devuelve todos los pokemons
          } else if (state.filterSource === "Api") {
            return !isNaN(pokemon.id); // Devuelve los pokemons de la API
          } else {
            return isNaN(pokemon.id); // Devuelve los pokemons de la Base de Datos
          }
        });


        // Manejo del caso en el que no se encuentran Pokémones que coincidan con los criterios
        const updatedFilteredPokemons = filteredBySourceAndType.length > 0 ? filteredBySourceAndType : [];

        return {
          ...state,
          // filteredPokemons: filteredBySourceAndType,
          //Para que no renderice nada, si no se encuentran coincidencias
          filteredPokemons: updatedFilteredPokemons,
          //filteredPokemons: filteredBySourceAndType.length > 0 ? filteredBySourceAndType : [],
          filterType: typeFilter,
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

  
      case RESET_FILTERS:
        return {
            ...initialState,
            allPokemons: state.allPokemonsBackUp,
            filterSource: "All",
            filterType: "All",
            sortAttack: null,
            sortName: null,
            currentPage: 0,
        };

    default:
      return state;
  }
};

export default rootReducer;






