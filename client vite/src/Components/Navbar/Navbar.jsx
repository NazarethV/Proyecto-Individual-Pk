import React from 'react'
import style from './navbar.module.css'
import { Link } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'

const Navbar = () => {
  return (
    <div className={style.navContainer}>

        <div className={style.navImgCont}>
            <img src="" alt="" />
        </div>

        <div className={style.linkContainer}>
            <Link className={style.linkHome} to="/home"> HOME </Link>
            <Link className={style.linkForm} to="/newPokemon"> New Pokemon </Link>
        </div>

        <SearchBar />

    </div>
  )
}

export default Navbar