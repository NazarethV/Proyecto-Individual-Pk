import React from 'react'
import styles from './navbar.module.css'
import { Link, useLocation} from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'
import { useDispatch, useSelector } from 'react-redux'
import { resetFilters } from '../../Redux/Actions/actions'

const Navbar = () => {
  const dispatch = useDispatch()
  const { pathname } = useLocation()

  const handleReset = () => {
    dispatch(resetFilters())
  }

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
        </div>
        {/* <div className={styles.contenedorReset}>
          {(pathname === '/home' ) ? (
            <button className={styles.resetButton} onClick={handleReset}>
              Reset
            </button>
          ): null}
        </div> */}
      </div>
      <SearchBar />
    </div>
  );
};


export default Navbar