import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'

import styles from './navbar.module.css'

const Navbar = () => {

  return (
    <div className={styles.navContainer}>
      <div className={styles.navBrand}>
        <p className={styles.logo}> PI POKEMON </p>
      </div>
      <div className={styles.navActions}>
        <div className={styles.navLinks}>
          <Link className={styles.linkHome} to="/home">
            HOME
          </Link>
          <Link className={styles.linkForm} to="/newPokemon">
            New Pokemon
          </Link>
          <Link className={styles.linkForm} to="/newType">
            New Type
          </Link>
        </div>

      </div>
      <SearchBar />
    </div>
  );
};


export default Navbar