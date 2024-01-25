import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pokemons from '../../Components/Cards/Pokemons';
import { getPokemons, getTypes, filterByType, getNamePokemons, filterBySource, sortByAttack, sortByName } from '../../Redux/Actions/actions';

const Home = () => {
  const dispatch = useDispatch();

  const allPokemons = useSelector((state) => state.allPokemons);
  const allPokemonsBackUp = useSelector((state) => state.allPokemonsBackUp);
  const allTypes = useSelector((state) => state.allTypes);

  //const [filteredPokemons, setFilteredPokemons] = useState([]);

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);

  const handleFilterSource = (event) => {
    dispatch(filterBySource(event.target.value));
  };

  const handleFilterType = (event) => {
    dispatch(filterByType(event.target.value))
  };

  const handleSortAttack = (e) => {
    e.preventDefault();
    if (e.target.value !== "attack") dispatch(sortByAttack(e.target.value));
  };

  const handleSort = (event) => {
    event.preventDefault()
    dispatch(sortByName(event.target.value))
  }

  // useEffect(() => {
  //   setFilteredPokemons(allPokemonsBackUp);
  // }, [allPokemonsBackUp]);

  return (
    <div>
      <h1>HOMEE</h1>

      <div >
        <h2>Filtros</h2>

      <div>
        <select onChange={(event) => handleFilterSource(event)}>
          <option value='All'>All</option>
          <option value='Created'>Created | Base de datos</option>
          <option value='Api'>Api</option>
        </select>
      </div>

      <div>
        <select onChange={(e) => handleFilterType(e)} name="types">
          <option value="All"> All Types </option>
          {allTypes?.map((t) => {
            return (
              <option key={t.id} value={t.name}>
                  {t.name}
              </option>
            )
          })}
         
        </select>
      </div>
      </div>

      <div>
        <h2>Ordenamiento</h2>

          <select onChange={(e) => handleSort(e)}>
            <option value="sort">Sort</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>


          <select onChange={(e) => handleSortAttack(e)}>
            <option value="attack">Attack</option>
            <option value="min">min</option>
            <option value="max">max</option>
          </select>
      </div>


      {/* <Pokemons allPokemons={filteredPokemons} /> */}
      {/* <Pokemons filteredPokemons={filteredPokemons} /> */}
      <Pokemons allPokemons={allPokemons} />
    </div>
  );
};

export default Home;


// const Home = () => {
//   const dispatch = useDispatch();

//   const allPokemons = useSelector((state) => state.allPokemons);
//   const allPokemonsBackUp = useSelector((state) => state.allPokemonsBackUp)
//   const types = useSelector((state) => state.allTypes);
  

//   // Ciclo de vida de los componentes:
//   useEffect(() => {
//     dispatch(getPokemons());
//     dispatch(getTypes());
//   }, [dispatch]);


//   const handleFilterSource = (event) => {
//     dispatch(filterBySource(event.target.value))
//   }


//   const handleFilterType = (event) => {
//     // const selectedValue = event.target.value;
//     // dispatch(filterType(selectedValue));
//     event.preventDefault()
//     if(event.target.value !== 'Types'){
//       dispatch(filterByType(event.target.value))
//     }
//   };



//   // Si hay resultados de búsqueda, muestra esos resultados. Si no, muestra la lista completa.
//   //const pokemonsToRender = notFound ? [] : (searchResults.length > 0 ? searchResults : allPokemons);

//   return (
//     <div>
//       <h1>HOMEE</h1>

//       {/* <div>
//         <h4>Filtros</h4>
//         <select onChange={(e) => handleFilterType(e)} 
//                 name='types'>
//           <option value='' disabled>
//             Seleccione type
//           </option>
//           <option value='todos'>Todos</option>
//           {types?.map((type) => (
//             <option key={type.id} value={type.name}>
//               {type.name}
//             </option>
//           ))}
//         </select>
//       </div> */}

//       <div>
//         <select onChange={(event) => handleFilterSource(event)}>
//             <option value='All'> All </option>
//             <option value='Created'> Created | Base de datos</option>
//             <option value='Api'> Api </option>
//         </select>
//       </div>


//       {/* A las Cards le paso la info de todos los pokemons o los resultados de búsqueda */}
//       {/* <Pokemons allPokemons={pokemonsToRender} /> */}
//       <Pokemons allPokemons={allPokemons} />
//       {/* {notFound ? (
//         <p>No se encontraron resultados</p>
//       ) : (
//         <Pokemons allPokemons={searchResults} />
//       )} */}
//     </div>
//   );
// };

// export default Home;


// import React from 'react'
// import { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import Pokemons from '../../Components/Cards/Pokemons'
// import { getPokemons, getPokemonID, getNamePokemons ,getTypes, filterCreated, filterType } from '../../Redux/Actions/actions'

// const Home = () => {
//     const dispatch = useDispatch()

//     const allPokemons = useSelector((state) => state.allPokemons)
//     const types = useSelector((state) => state.types)
//     const allPokemonsBackUp = useSelector((state) => state.allPokemonsBackUp)

//     //Ciclo de vida de los componentes:
//     useEffect(() => {//Se activan estas funciones que mandan su info al reducer, cuando se activa este componente
//         dispatch(getPokemons())//Activa a la funcion que trae a todos los pokemons (en actions)
//         dispatch(getTypes())
//     }, [allPokemonsBackUp, dispatch])


//     const handleFilterType = (event) => {
//         //Obtengo el valor seleccionado del filtro de type
//         const selectedValue = event.target.value
//         console.log('el valor recibido es: ', selectedValue)

//         //Luego envía el valor al store de Redux
//         dispatch(filterType(selectedValue))
//     }


//   return (
//     <div>
//         <h1>HOMEE</h1>

//         <div>
//         <h4>Filtros</h4>
//         <select
//             onChange={(e) => handleFilterType(e)}
//             name='types'
//         >
//             <option value='' disabled>
//                 Seleccione type
//             </option>

//             <option value='todos'>
//                 Todos
//             </option>

//             {types?.map((type) => (
//                 <option key={type.id} value={type.name}>
//                     {type.name}
//                 </option>
//             ))}

//         </select>
        
//     </div>

//     {/*A las Cards le paso la info de todos los pokemons */}
//     <Pokemons allPokemons={allPokemons} />
//     </div>
//   )
// }

// export default Home