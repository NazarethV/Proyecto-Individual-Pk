// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import Pokemons from '../../Components/Cards/Pokemons';
// import { getPokemons, getTypes, filterByType, filterBySource, sortByAttack, sortByName } from '../../Redux/Actions/actions';
// import Pagination from '../../Components/Pagination/Pagination';

// import style from './home.module.css'

// const Home = () => {
//     const dispatch = useDispatch();
//     const allPokemons = useSelector((state) => state.allPokemons);
//     const allTypes = useSelector((state) => state.allTypes);
//     const filteredPokemons = useSelector((state) => state.filteredPokemons);

//     //Para combinar y guardar
//     const sortName = useSelector((state) => state.sortName)
//     const sortAttack = useSelector((state) => state.sortAttack)
//     const filterSource = useSelector((state) => state.filterSource)
//     const filterType = useSelector((state) => state.filterType)
   
//     const totalPokemons = filteredPokemons.length || allPokemons.length ;
   


//     //const [orden, setOrden] = useState("");   //estado local vacio, q solo lo voy a usar es para cuando yo setee esta pagina me modifique el estado local y se renderice

//     //////////PAGINADO/////////////
//     // const [currentPage, setCurrentPage] = useState(1);                  //declaro estado local en el q le paso la pagina actual,  y cual va a ser la pag actual (va a arrancar en 1)
//     // const [pokemonsPerPage, setPokemonsPerPage] = useState(12);         //declaro otro estado local que tengo la cant de pokemons por pagina y va a arrancar en 12
//     // const indexOfLastPokemon = currentPage * pokemonsPerPage;           //seteo el indice del ultimo pokemon, y le digo sobre la pag actual mutiplicame la cant de pokemon * pagina
//     // const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;   //seteo el indice del primer pokemon, y me lo va a dar la resta entre el indice del ultimo poquemon menos los pokemon por pagina
//     // // const currentPokemons = allPokemons.slice(    
//     // const currentPokemons = filteredPokemons.slice(                             //finalmente me declaro la constante donde se va a ir guardando cuales son los pokemons que hay q renderizar dependiendo de la pagina
//     //     indexOfFirstPokemon,                                            //a todos los pokemons cortmelos(slice) con el indice del primer pokemon de esa pag y el indice del ultimo pokemon de esa pagina
//     //     indexOfLastPokemon
//     // )                                        //por eso se va a ir modificando dependiendo de la pag q yo este


//     // const paginado = (pageNumber) => {
//     //     setCurrentPage(pageNumber)
//     // }

//   const [currentPage, setCurrentPage] = useState(1);
//   const [pokemonsPerPage] = useState(12);

//   const indexOfLastPokemon = currentPage * pokemonsPerPage;
//   const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
//   //Para que se rendericen todos o los filtrados -->
  

//   //const currentPokemons = filteredPokemons.length > 0 ? filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon) : [];
//   const currentPokemons = filteredPokemons.length > 0 ? filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon) : allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
//     //Para que renderice todos los pokemons al ni bien renderizar el home -->
//   const showPokemons = currentPokemons.length > 0 || filteredPokemons.length === 0;

//   //const currentPokemons = filteredPokemons.length ? filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon) : allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
//   //const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

//   const paginado = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };


//     useEffect(() => {
//         dispatch(getPokemons());
//         dispatch(getTypes());
//     }, [dispatch]);

//     //Para mantener los filtros cuando cambio de componente 
//     useEffect(() => {
//         // Filtrar por los valores almacenados en el estado global de Redux cuando se monta el componente
//         dispatch(filterBySource(filterSource));
//         dispatch(filterByType(filterType));
//         sortName !== "" ? dispatch(sortByName(sortName)) : sortAttack !== "" ? dispatch(sortByAttack(sortAttack)) : null;
//     }, [dispatch, filterSource, filterType, sortName, sortAttack]);
    


//     const handleFilterSource = (event) => {
//         dispatch(filterBySource(event.target.value));

//         //combinar con ordenamiento
//         //sortName !== "" ? dispatch(sortByName(sortName)) : sortAttack !== "" ? dispatch(sortByAttack(sortAttack)) : "nada"
//     };

//     const handleFilterType = (event) => {
//         dispatch(filterByType(event.target.value));

//         //combinar con ordenamiento
//         //sortName !== "" ? dispatch(sortByName(sortName)) : sortAttack !== "" ? dispatch(sortByAttack(sortAttack)) : "nada"

//     };

   
//     const handleSortAttack = (e) => {
//         dispatch(sortByAttack(e.target.value));

//         document.getElementById("nameSelect").value = "sort" ;
//     };
    
//     const handleSort = (event) => {
//         dispatch(sortByName(event.target.value));

//         document.getElementById("attackSelect").value = "attack"
//     };


//     // Función para renderizar la paginación
//     function renderPagination() {
//         if (filteredPokemons.length > 0) {
//             return (
//                 <div className="pagination-container">
//                     <Pagination
//                         pokemonsPerPage={pokemonsPerPage}
//                         totalPokemons={totalPokemons}
//                         paginado={paginado}
//                     />
//                 </div>
//             );
//         } else {
//             return null; // No renderizar nada si no hay pokemons filtrados
//         }
//     }

//     return (
//         <div>
//             <h1>HOME</h1>
//             <div>
//                 <h2>Filters</h2>
//                 <div>
//                     <p>Filter by Source</p>
//                     <select onChange={(event) => handleFilterSource(event)}>
//                         <option value='All'>All Source</option>
//                         <option value='Created'>Created | db</option>
//                         <option value='Api'>Api</option>
//                     </select>
//                 </div>
//                 <div>
//                     <p>Filter by Type</p>
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
//                 <h2>Order</h2>
//                 <select id="nameSelect" onChange={(e) => handleSort(e)}>
//                     <option value="sort">Sort by name</option>
//                     <option value="asc">A-Z</option>
//                     <option value="desc">Z-A</option>
//                 </select>
//                 <select id="attackSelect" onChange={(e) => handleSortAttack(e)}>
//                     <option value="attack">Sort by attack</option>
//                     <option value="min">min</option>
//                     <option value="max">max</option>
//                 </select>
//             </div>




       
//         {/* Renderizar la lista de pokemons o el mensaje*/}
//         {filteredPokemons.length > 0 ? (
//             <Pokemons allPokemons={currentPokemons} />
//         ) : (
//             // Si no hay pokemons filtrados, mostrar el mensaje solo si no hay filtros aplicados
//             filterSource === 'All' && filterType === 'All' && sortName === '' && sortAttack === '' ? (
//                 <Pokemons allPokemons={allPokemons} />
//             ) : (
//                 <p>No pokemon matches the selected criteria.</p>
//             )
//         )}

           


//             {/* <Pokemons allPokemons={currentPokemons} /> */}
//             {/* <Pokemons allPokemons={filteredPokemons.length ? filteredPokemons : allPokemons} /> */}

//             {/* Paginado */}
//             // <div className="pagination-container">
//             //     <Pagination
//             //         pokemonsPerPage={pokemonsPerPage}
//             //         //allPokemons={filteredPokemons.length || allPokemons.length}
//             //         totalPokemons={totalPokemons} // allPokemons={allPokemons.length}  allPokemons={filteredPokemons.length}
//             //         paginado={paginado}
//             //     />
//             // </div>


//             /* Renderizar el paginado solo si hay pokemons que coinciden con los criterios de filtrado */
//             <div>{filteredPokemons.length > 0 && renderPagination()}</div>
//     </div>
//     );
// };

// export default Home;





import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pokemons from '../../Components/Cards/Pokemons';
import { getPokemons, getTypes, filterByType, filterBySource, sortByAttack, sortByName } from '../../Redux/Actions/actions';
import Pagination from '../../Components/Pagination/Pagination';

import style from './home.module.css';

const Home = () => {
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.allPokemons);
    const allTypes = useSelector((state) => state.allTypes);
    const filteredPokemons = useSelector((state) => state.filteredPokemons);

    // Para combinar y guardar
    const sortName = useSelector((state) => state.sortName);
    const sortAttack = useSelector((state) => state.sortAttack);
    const filterSource = useSelector((state) => state.filterSource);
    const filterType = useSelector((state) => state.filterType);
   
    const totalPokemons = filteredPokemons.length || allPokemons.length;
   
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage] = useState(12);

    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;

    const currentPokemons = filteredPokemons.length > 0 ? filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon) : allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        dispatch(getPokemons());
        dispatch(getTypes());
    }, [dispatch]);

    // useEffect(() => {
    //     dispatch(filterBySource(filterSource));
    //     dispatch(filterByType(filterType));
    //     sortName !== "" ? dispatch(sortByName(sortName)) : sortAttack !== "" ? dispatch(sortByAttack(sortAttack)) : null;
    // }, [dispatch, filterSource, filterType, sortName, sortAttack]);

    useEffect(() => {
        dispatch(filterBySource(filterSource));
        dispatch(filterByType(filterType));
        sortName !== null ? dispatch(sortByName(sortName)) : sortAttack !== null ? dispatch(sortByAttack(sortAttack)) : null;
    }, [dispatch, filterSource, filterType, sortName, sortAttack]);



    const handleFilterSource = (event) => {
        dispatch(filterBySource(event.target.value));
    };

    const handleFilterType = (event) => {
        dispatch(filterByType(event.target.value));
    };

    const handleSortAttack = (e) => {
        dispatch(sortByAttack(e.target.value));
        document.getElementById("nameSelect").value = "sort" ;
    };
    
    const handleSort = (event) => {
        dispatch(sortByName(event.target.value));
        document.getElementById("attackSelect").value = "attack";
    };

    function renderPagination() { //Renderizo el paginado si hay pokemons renderizados, sino no
        if (filteredPokemons.length > 0) {
            return (
                <div className="pagination-container">
                    <Pagination
                        pokemonsPerPage={pokemonsPerPage}
                        totalPokemons={totalPokemons}
                        paginado={paginado}
                    />
                </div>
            );
        } else {
            return null;
        }
    }

    return (
        <div>
            <h1>HOME</h1>
            <div>
                <h2>Filters</h2>
                <div>
                    <p>Filter by Source</p>
                    <select onChange={(event) => handleFilterSource(event)}>
                        <option value='All'>All Source</option>
                        <option value='Created'>Created | db</option>
                        <option value='Api'>Api</option>
                    </select>
                </div>
                <div>
                    <p>Filter by Type</p>
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
                <h2>Order</h2>
                <select id="nameSelect" onChange={(e) => handleSort(e)}>
                    <option value="sort">Sort by name</option>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
                <select id="attackSelect" onChange={(e) => handleSortAttack(e)}>
                    <option value="attack">Sort by attack</option>
                    <option value="min">min</option>
                    <option value="max">max</option>
                </select>
            </div>

            {/* Renderizar la lista de pokemons o el mensaje*/}

            {filteredPokemons.length > 0 ? (
                <Pokemons allPokemons={currentPokemons} />
            ) : (
                filterSource === 'All' && filterType === 'All' && sortName === null && sortAttack === null ? (
                    <Pokemons allPokemons={allPokemons} /> // Renderizar todos los pokemons al cargar la página
                ) : (
                    <p>No pokemon matches the selected criteria.</p>
                )
            )}

            {/* Renderizar el Paginado solo si hay pokemons que coinciden con los criterios de filtrado */}
            {filteredPokemons.length > 0 && renderPagination()}
        </div>
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







































// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import Pokemons from '../../Components/Cards/Pokemons';
// import { getPokemons, getTypes, filterByType, filterBySource, sortByAttack, sortByName } from '../../Redux/Actions/actions';
// import { applyFiltersAndOrder } from '../../Redux/Actions/actions';
// import Pagination from '../../Components/Pagination/Pagination';

// const Home = () => {
//     const dispatch = useDispatch();
//     const allPokemons = useSelector((state) => state.allPokemons);
//     const allTypes = useSelector((state) => state.allTypes);
//     const filteredPokemons = useSelector((state) => state.filteredPokemons);
   
//     const totalPokemons = filteredPokemons.length || allPokemons.length || "No hay";
   
//     const filterSource = useSelector((state) => state.filterSource);
//     const filterType = useSelector((state) => state.filterType);
//     const orderBy = useSelector((state) => state.orderBy);
//     const orderDirection = useSelector((state) => state.orderDirection);

//     const [currentPage, setCurrentPage] = useState(1);
//     const [pokemonsPerPage] = useState(12);

//     const indexOfLastPokemon = currentPage * pokemonsPerPage;
    // const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    // const currentPokemons = filteredPokemons.length ? filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon) : allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

    // const paginado = (pageNumber) => {
    //     setCurrentPage(pageNumber);
    // };

    // useEffect(() => {
    //     dispatch(getPokemons());
    //     dispatch(getTypes());
    // }, [dispatch]);

    // useEffect(() => {
    //     dispatch(filterBySource("All"));
    // }, [dispatch]);

    // useEffect(() => {
    //     dispatch(applyFiltersAndOrder());
    // }, [dispatch, filterSource, filterType, orderBy, orderDirection]);

    // const handleFilterSource = (event) => {
    //     dispatch(filterBySource(event.target.value));
    // };

    // const handleFilterType = (event) => {
    //     dispatch(filterByType(event.target.value));
    // };

    // const handleSortAttack = (e) => {
    //     if (e.target.value !== "attack") dispatch(sortByAttack(e.target.value));
    // };

    // const handleSort = (event) => {
    //     dispatch(sortByName(event.target.value));
    // };

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

//             <Pokemons allPokemons={currentPokemons} />

//             <div className="pagination-container">
//                 <Pagination
//                     pokemonsPerPage={pokemonsPerPage}
//                     totalPokemons={totalPokemons}
//                     paginado={paginado}
//                 />
//             </div>
//         </div>
//     );
// };

// export default Home;






















