import React from 'react'
import styles from './navbar.module.css'
import { Link } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'

const Navbar = () => {
  return (
    <div className={styles.navContainer}>
      <div className={styles.navBrand}>
        <p className={styles.logo}> PI POKEMON </p>
      </div>
      <div className={styles.navLinks}>
        <Link className={styles.linkHome} to="/home">
          HOME
        </Link>
        <Link className={styles.linkForm} to="/newPokemon">
          New Pokemon
        </Link>
      </div>
      <SearchBar />
    </div>
  );
};


export default Navbar