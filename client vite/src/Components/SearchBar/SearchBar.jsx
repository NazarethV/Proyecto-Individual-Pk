import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getNamePokemons } from '../../Redux/Actions/actions'

import styles from './searchBar.module.css'

const SearchBar = () => {

  const dispatch = useDispatch()
  const [name, setName] = useState("")

  const clearInput = () => {
    document.getElementById('searchbar-input').value = ''
  }

  const handleChange = (event) => {
    event.preventDefault()
    setName(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(getNamePokemons(name))
    clearInput()
    setName('')
  }


  const handleKeyDown = (event) => {
    if(event.key === 'Enter'){
      handleSubmit()
    }
  }


  return (
    <div className={styles.searchContainer}>
    <input
        id='searchbar-input'
        type='text'
        placeholder='Search Pokemon by name'
        onChange={(e) => handleChange(e)}
        onKeyDown={(e) => handleKeyDown(e)}
        className={styles.input}
    />
    <button
        type='submit'
        onClick={(e) => handleSubmit(e)}
        className={styles.button}
    >
        Search
    </button>


</div>
  )
}

export default SearchBar
   