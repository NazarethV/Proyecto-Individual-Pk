
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





import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pokemons from '../../Components/Cards/Pokemons';
import { getPokemons, getTypes, filterByType, filterBySource, sortByAttack, sortByName } from '../../Redux/Actions/actions';

const Home = () => {
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.allPokemons);
    const allTypes = useSelector((state) => state.allTypes);
    const filteredPokemons = useSelector((state) => state.filteredPokemons);

    useEffect(() => {
        dispatch(getPokemons());
        dispatch(getTypes());
    }, [dispatch]);


    useEffect(() => {
      // Cuando se monta el componente, filtramos los pokemons por "All"
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
            <Pokemons allPokemons={filteredPokemons.length ? filteredPokemons : allPokemons} />
        </div>
    );
};

export default Home;
