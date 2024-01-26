
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import Pokemons from '../../Components/Cards/Pokemons';
// import { getPokemons, getTypes, filterByType, getNamePokemons, filterBySource, sortByAttack, sortByName } from '../../Redux/Actions/actions';



// const Home = () => {
//   const dispatch = useDispatch();

//   const allPokemons = useSelector((state) => state.allPokemons);
//   const allPokemonsBackUp = useSelector((state) => state.allPokemonsBackUp);
//   const allTypes = useSelector((state) => state.allTypes);
//   const filteredPokemons = useSelector((state) => state.filteredPokemons); // Obtén los Pokémon filtrados del estado


//   //const [filteredPokemons, setFilteredPokemons] = useState([]);

//   useEffect(() => {
//     dispatch(getPokemons());
//     dispatch(getTypes());

//     dispatch(filterBySource('All'));
//   }, [dispatch]);

//   // const handleFilterSource = (event) => {
//   //   dispatch(filterBySource(event.target.value));
//   // };

//   // const handleFilterType = (event) => {
//   //   dispatch(filterByType(event.target.value))
//   // };

//   const handleFilterSource = (event) => {
//     dispatch(filterBySource(event.target.value));
//     // Restablecer la opción de ordenamiento por name
//     document.getElementById("sortSelect").value = "sort";
//     // Restablecer la opción de ordenamiento por attack
//     document.getElementById("attackSelect").value = "attack";
// };

// const handleFilterType = (event) => {
//     dispatch(filterByType(event.target.value));
//     // Restablecer la opción de ordenamiento por name
//     document.getElementById("sortSelect").value = "sort";
//     // Restablecer la opción de ordenamiento por attack
//     document.getElementById("attackSelect").value = "attack";
// };

//   const handleSortAttack = (e) => {
//     e.preventDefault();
//     if (e.target.value !== "attack") dispatch(sortByAttack(e.target.value));
//   };

//   const handleSort = (event) => {
//     event.preventDefault()
//     dispatch(sortByName(event.target.value))
//   }

//   // useEffect(() => {
//   //   setFilteredPokemons(allPokemonsBackUp);
//   // }, [allPokemonsBackUp]);

//   return (
//     <div>
//       <h1>HOMEE</h1>

//       <div >
//         <h2>Filtros</h2>

//       <div>
//         <select onChange={(event) => handleFilterSource(event)} value="All">
//           <option value='All'>All</option>
//           <option value='Created'>Created | Base de datos</option>
//           <option value='Api'>Api</option>
//         </select>
//       </div>

//       <div>
//         <select onChange={(e) => handleFilterType(e)} name="types">
//           <option value="All"> All Types </option>
//           {allTypes?.map((t) => {
//             return (
//               <option key={t.id} value={t.name}>
//                   {t.name}
//               </option>
//             )
//           })}
         
//         </select>
//       </div>
//       </div>

//       <div>
//         <h2>Ordenamiento</h2>

//           <select id="sortSelect" onChange={(e) => handleSort(e)}>
//             <option value="sort">Sort</option>
//             <option value="asc">A-Z</option>
//             <option value="desc">Z-A</option>
//           </select>


//           <select id="attackSelect" onChange={(e) => handleSortAttack(e)}>
//             <option value="attack">Attack</option>
//             <option value="min">min</option>
//             <option value="max">max</option>
//           </select>
//       </div>

//       {/* <Pokemons allPokemons={filteredPokemons.length ? filteredPokemons : allPokemonsBackUp} /> */}
//       <Pokemons allPokemons={filteredPokemons.length ? filteredPokemons : allPokemons} />
//       {/* <Pokemons allPokemons={filteredPokemons} /> */}
//       {/* <Pokemons allPokemons={filteredPokemons} />  */}
//       {/* <Pokemons allPokemons={allPokemons} /> */}
//       {/*<Pokemons allPokemons={filteredPokemons.length ? filteredPokemons : allPokemons} />*/} {/* Muestra los Pokémon filtrados si existen, de lo contrario muestra todos los Pokémon */}
//     </div>
//   );
// };

// export default Home;


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pokemons from '../../Components/Cards/Pokemons';
import { getPokemons, getTypes, filterByType, filterBySource, sortByAttack, sortByName } from '../../Redux/Actions/actions';
import Pagination from '../../Components/Pagination/Pagination';

import style from './home.module.css'

const Home = () => {
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.allPokemons);
    const allTypes = useSelector((state) => state.allTypes);
    const filteredPokemons = useSelector((state) => state.filteredPokemons);
    const totalPokemons = filteredPokemons.length || allPokemons.length;

    //const [orden, setOrden] = useState("");   //estado local vacio, q solo lo voy a usar es para cuando yo setee esta pagina me modifique el estado local y se renderice

    //////////PAGINADO/////////////
    // const [currentPage, setCurrentPage] = useState(1);                  //declaro estado local en el q le paso la pagina actual,  y cual va a ser la pag actual (va a arrancar en 1)
    // const [pokemonsPerPage, setPokemonsPerPage] = useState(12);         //declaro otro estado local que tengo la cant de pokemons por pagina y va a arrancar en 12
    // const indexOfLastPokemon = currentPage * pokemonsPerPage;           //seteo el indice del ultimo pokemon, y le digo sobre la pag actual mutiplicame la cant de pokemon * pagina
    // const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;   //seteo el indice del primer pokemon, y me lo va a dar la resta entre el indice del ultimo poquemon menos los pokemon por pagina
    // // const currentPokemons = allPokemons.slice(    
    // const currentPokemons = filteredPokemons.slice(                             //finalmente me declaro la constante donde se va a ir guardando cuales son los pokemons que hay q renderizar dependiendo de la pagina
    //     indexOfFirstPokemon,                                            //a todos los pokemons cortmelos(slice) con el indice del primer pokemon de esa pag y el indice del ultimo pokemon de esa pagina
    //     indexOfLastPokemon
    // )                                        //por eso se va a ir modificando dependiendo de la pag q yo este


    // const paginado = (pageNumber) => {
    //     setCurrentPage(pageNumber)
    // }

  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(12);

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  //Para que se rendericen todos o los filtrados -->
  const currentPokemons = filteredPokemons.length ? filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon) : allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
  //const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


    useEffect(() => {
        dispatch(getPokemons());
        dispatch(getTypes());
    }, [dispatch]);

    useEffect(() => {
        // Filtrar por "All" cuando se monta el componente
        dispatch(filterBySource("All"));
    }, [dispatch]);

    const handleFilterSource = (event) => {
        dispatch(filterBySource(event.target.value));
        document.getElementById("sortSelect").value = "sort";
        document.getElementById("attackSelect").value = "attack";
    };

    const handleFilterType = (event) => {
        dispatch(filterByType(event.target.value));
        document.getElementById("sortSelect").value = "sort";
        document.getElementById("attackSelect").value = "attack";
    };

    const handleSortAttack = (e) => {
        e.preventDefault();
        if (e.target.value !== "attack") dispatch(sortByAttack(e.target.value));
    };

    const handleSort = (event) => {
        event.preventDefault();
        dispatch(sortByName(event.target.value));
    };

    return (
        <div>
            <h1>HOMEE</h1>
            <div>
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
                <select id="sortSelect" onChange={(e) => handleSort(e)}>
                    <option value="sort">Sort</option>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
                <select id="attackSelect" onChange={(e) => handleSortAttack(e)}>
                    <option value="attack">Attack</option>
                    <option value="min">min</option>
                    <option value="max">max</option>
                </select>
            </div>

            <Pokemons allPokemons={currentPokemons} />
            {/* <Pokemons allPokemons={filteredPokemons.length ? filteredPokemons : allPokemons} /> */}
            {/* <Pokemons allPokemons={filteredPokemons} /> */}

            {/* Paginado */}
            <div className="pagination-container">
                <Pagination
                    pokemonsPerPage={pokemonsPerPage}
                    totalPokemons={totalPokemons}
                    paginado={paginado}
                />
            </div>
    </div>
            /* <div>
              <Pagination 
                    pokemonsPerPage={pokemonsPerPage}
                    // allPokemons={allPokemons.length}
                    allPokemons={filteredPokemons.length}
                    paginado={paginado}
              /> 
            </div> */


        //</div>
    );
};

export default Home;


// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import Pokemons from '../../Components/Cards/Pokemons';
// import { getPokemons, getTypes, filterByType, filterBySource, sortByAttack, sortByName } from '../../Redux/Actions/actions';

// const Home = () => {
//     const dispatch = useDispatch();
//     const allPokemons = useSelector((state) => state.allPokemons);
//     const allTypes = useSelector((state) => state.allTypes);
//     const filteredPokemons = useSelector((state) => state.filteredPokemons);

//     useEffect(() => {
//         dispatch(getPokemons());
//         dispatch(getTypes());
//     }, [dispatch]);


//     useEffect(() => {
//       // Cuando se monta el componente, filtramos los pokemons por "All"
//       dispatch(filterBySource("All"));
//   }, [dispatch]);


//     const handleFilterSource = (event) => {
//         dispatch(filterBySource(event.target.value));
//         document.getElementById("sortSelect").value = "sort";
//         document.getElementById("attackSelect").value = "attack";
//     };

//     const handleFilterType = (event) => {
//         dispatch(filterByType(event.target.value));
//         document.getElementById("sortSelect").value = "sort";
//         document.getElementById("attackSelect").value = "attack";
//     };

//     const handleSortAttack = (e) => {
//         e.preventDefault();
//         if (e.target.value !== "attack") dispatch(sortByAttack(e.target.value));
//     };

//     const handleSort = (event) => {
//         event.preventDefault();
//         dispatch(sortByName(event.target.value));
//     };

//     return (
//         <div>
//             <h1>HOMEE</h1>
//             <div>
//                 <h2>Filtros</h2>
//                 <div>
//                     <select onChange={(event) => handleFilterSource(event)}>
//                         <option value='All'>All</option>
//                         <option value='Created'>Created | Base de datos</option>
//                         <option value='Api'>Api</option>
//                     </select>
//                 </div>
//                 <div>
//                     <select onChange={(e) => handleFilterType(e)} name="types">
//                         <option value="All"> All Types </option>
//                         {allTypes?.map((t) => {
//                             return (
//                                 <option key={t.id} value={t.name}>
//                                     {t.name}
//                                 </option>
//                             )
//                         })}
//                     </select>
//                 </div>
//             </div>
//             <div>
//                 <h2>Ordenamiento</h2>
//                 <select id="sortSelect" onChange={(e) => handleSort(e)}>
//                     <option value="sort">Sort</option>
//                     <option value="asc">A-Z</option>
//                     <option value="desc">Z-A</option>
//                 </select>
//                 <select id="attackSelect" onChange={(e) => handleSortAttack(e)}>
//                     <option value="attack">Attack</option>
//                     <option value="min">min</option>
//                     <option value="max">max</option>
//                 </select>
//             </div>
//             {/* <Pokemons allPokemons={filteredPokemons.length ? filteredPokemons : allPokemons} /> */}
//             <Pokemons allPokemons={filteredPokemons} />
//         </div>
//     );
// };

// export default Home;
