
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pokemons from '../../Components/Cards/Pokemons';
import { getPokemons, getTypes, filterByType, filterBySource, sortByAttack, sortByName } from '../../Redux/Actions/actions';
import Pagination from '../../Components/Pagination/Pagination';

import styles from './home.module.css';

const Home = () => {
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.allPokemons);
    const allTypes = useSelector((state) => state.allTypes);
    const filteredPokemons = useSelector((state) => state.filteredPokemons);
    const pokemonName = useSelector((state) => state.pokemonName);

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

    //Renderiza los filtrados, o los por nombre, o todos

    const currentPokemons = filteredPokemons.length > 0 ? filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon) : allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
    //const currentPokemons = (filteredPokemons.length > 0 ? filteredPokemons : allPokemons).slice(indexOfFirstPokemon, indexOfLastPokemon);


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

        // Limpiar el estado de búsqueda por nombre al aplicar filtros
        //dispatch(getNamePokemons('')); // Suponiendo que esta acción limpia el estado de búsqueda por nombre

    }, [dispatch, filterSource, filterType, sortName, sortAttack]);



    const handleFilterSource = (event) => {
        dispatch(filterBySource(event.target.value));

        //Para que se renderice la primer pagina
        setCurrentPage(1)
    };

    const handleFilterType = (event) => {
        dispatch(filterByType(event.target.value));
        //Para que se renderice la primer pagina
        setCurrentPage(1)
    };

    const handleSortAttack = (e) => {
        dispatch(sortByAttack(e.target.value));
        document.getElementById("nameSelect").value = "sort" ;
        //Para que se renderice la primer pagina
        setCurrentPage(1)
    };

    const handleSort = (event) => {
        dispatch(sortByName(event.target.value));
        document.getElementById("attackSelect").value = "attack";
        //Para que se renderice la primer pagina
        setCurrentPage(1)
    };


    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < Math.ceil(totalPokemons / pokemonsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const renderPagination = (handlePrevPage, handleNextPage, currentPage) => {
      return (
            <div className="pagination-container">
                <Pagination
                    pokemonsPerPage={pokemonsPerPage}
                    // totalPokemons={totalPokemons}
                    pokemons={filteredPokemons.length > 0 ? filteredPokemons : allPokemons}
                    paginado={paginado}
                    handlePrevPage={handlePrevPage}
                    handleNextPage={handleNextPage}
                    currentPage={currentPage}
                />
            </div>
            );
    }

    return (
        <div className={styles.homeContainer}>
            <h2 className={styles.title}>HOME</h2>

        <div className={styles.filtersAndOrdersContainer}>

        <div className={styles.filtersContainer}>
            <div className={styles.selectContainer}>
                <p className={styles.selectLabel}>Filter by Source</p>
                <select className={styles.selectDropdown} value={filterSource || ''} onChange={(event) => handleFilterSource(event)}>
                    <option value='All'>All Source</option>
                    <option value='Created'>Created | db</option>
                    <option value='Api'>Api</option>
                </select>
            </div>

            {/* Filtro por Type */}
            <div className={`${styles.selectContainer} ${styles.filterByType}`}>
                <p className={styles.selectLabel}>Filter by Type</p>
                <select className={styles.selectDropdown} value={filterType || ''} onChange={(e) => handleFilterType(e)} name="types">
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

        {/* Contenedor de ordenamientos */}
        <div className={styles.orderContainer}>
            <div className={styles.selectContainer}>
                <p className={styles.selectLabel}>Order by Name</p>
                <select className={styles.selectDropdown} value={sortName || ''} id="nameSelect" onChange={(e) => handleSort(e)}>
                    <option value="sort">Sort by name</option>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
            </div>

            {/* Orden por Attack */}
            <div className={`${styles.selectContainer} ${styles.orderByAttack}`}>
                <p className={styles.selectLabel}>Order by Attack</p>
                <select className={styles.selectDropdown} value={sortAttack || ''} id="attackSelect" onChange={(e) => handleSortAttack(e)}>
                    <option value="attack">Sort by attack</option>
                    <option value="min">min</option>
                    <option value="max">max</option>
                </select>
            </div>
        </div>

        </div>

            <p className={styles.page}>Page {currentPage}</p>


            {pokemonName.length > 0 ? (
                <Pokemons allPokemons={pokemonName} />
            ) : (
                <Pokemons allPokemons={currentPokemons} />
            )}


            {/* // {filteredPokemons.length > 0 ? ( */}
            {/* //     <Pokemons allPokemons={currentPokemons} />
            // ) : (
            //     filterSource === 'All' && filterType === 'All' && sortName === null && sortAttack === null ? (
            //         <Pokemons allPokemons={currentPokemons} />
            //         ) : (
            //         <p>No pokemon matches the selected criteria.</p>
            //     )
            // )} */}


            <div className={styles.paginationContainer}>
            {/* Renderizo el Paginado */}
            {/* {renderPagination()} */}
            {renderPagination(handlePrevPage, handleNextPage)}
             {/* {filteredPokemons.length > 0 && renderPagination()}  */}
            </div>

        </div>
    );
};

export default Home;












