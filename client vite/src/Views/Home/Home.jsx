

///////ESTE ESS
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
   
  
   const totalPokemons = filteredPokemons.length > 0 ? filteredPokemons.length : allPokemons.length;
    //Número de cantidad de pokemons a paginar
    //const totalPokemons = filteredPokemons.length > 0 ? filteredPokemons.length : allPokemons.length;
   
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage] = useState(12);

    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;

    //const currentPokemons = filteredPokemons.length > 0 ? filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon) : allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
    const currentPokemons = (filteredPokemons.length > 0 ? filteredPokemons : allPokemons).slice(indexOfFirstPokemon, indexOfLastPokemon);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        dispatch(getPokemons());
        dispatch(getTypes());
    }, [dispatch]);


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

    const renderPagination = () => {
      return (
            <div className="pagination-container">
                <Pagination
                    pokemonsPerPage={pokemonsPerPage}
                    // totalPokemons={totalPokemons}
                    pokemons={filteredPokemons.length > 0 ? filteredPokemons : allPokemons}
                    paginado={paginado}
                />
            </div>
            );
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

            {console.log('Cantidad de pokemons después de aplicar filtros:', filteredPokemons.length)}

            {/* Renderizar la lista de pokemons o el mensaje*/}
            {filteredPokemons.length > 0 ? (
                <Pokemons allPokemons={currentPokemons} />
            ) : (
                filterSource === 'All' && filterType === 'All' && sortName === null && sortAttack === null ? (
                   // <Pokemons allPokemons={allPokemons} /> // Renderizar todos los pokemons al cargar la página
                    // <Pokemons allPokemons={allPokemons} /> //currentPokemons
                    <Pokemons allPokemons={currentPokemons} />
                    ) : (
                    <p>No pokemon matches the selected criteria.</p>
                )
            )}

            {/* Renderizo el Paginado */}
            {renderPagination()}
             {/* {filteredPokemons.length > 0 && renderPagination()}  */}

        </div>
    );
};

export default Home;












