import React from 'react'

import styles from './pagination.module.css';

const Pagination = ({ pokemonsPerPage, pokemons, paginado, handlePrevPage, handleNextPage, currentPage }) => {
  const totalPokemons = pokemons.length;
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
      pageNumbers.push(i);
  }

  if (pageNumbers.length === 0) {
      return null; // No hay necesidad de mostrar paginado si no hay pokemons en la página
  }

  return (
    <div className={styles.paginationContainer}>
        <nav>
            <ul className={`pagination ${styles.pagination}`}>
                <li className={`page-item ${styles.pageItem}`}>
                    <button onClick={handlePrevPage} className={`page-link ${styles.pageLink}`} disabled={currentPage === 1}>
                        Prev
                    </button>
                </li>
                {pageNumbers.map((number) => (
                    <li key={number} className={`page-item ${styles.pageItem}`}>
                        <button onClick={() => paginado(number)} className={`page-link ${styles.pageLink}`}>
                            {number}
                        </button>
                    </li>
                ))}
                <li className={`page-item ${styles.pageItem}`}>
                    <button onClick={handleNextPage} className={`page-link ${styles.pageLink}`} disabled={currentPage === Math.ceil(totalPokemons / pokemonsPerPage)}>
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    </div>
  );
};

export default Pagination;




