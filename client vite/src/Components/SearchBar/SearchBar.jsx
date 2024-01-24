// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getNamePokemons } from '../../Redux/Actions/actions';

// const SearchBar = () => {
//   const dispatch = useDispatch();
//   const [name, setName] = useState('');
//   const searchResults = useSelector((state) => state.allPokemons); // Cambiado a 'allPokemons'

//   const handleInputChange = (event) => {
//     setName(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     dispatch(getNamePokemons(name));
//   };

//   return (
//     <div>
//       <form onSubmit={(e) => handleSubmit(e)}>
//         <input
//           type='text'
//           placeholder='Search Pokemon by name'
//           value={name}
//           onChange={(e) => handleInputChange(e)}
//         />
//         <button type='submit'>Search</button>
//       </form>

//       {searchResults.length > 0 && (
//         <div>
//           <h3>Search Results:</h3>
//           <ul>
//             {searchResults.map((pokemon) => (
//               <li key={pokemon.id}>{pokemon.name}</li>
              
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchBar;

 
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getNamePokemons } from '../../Redux/Actions/actions'

import style from './searchBar.module.css'

const SearchBar = () => {

  const dispatch = useDispatch()
  const [name, setName] = useState("")

  // const handleInputChange = (event) => {
  //   event.preventDefault()
  //   setName(event.target.value)
  // }

  // const handleSubmit = (event) => {
  //   //event.preventDefault()
  //   if(!name || !isNaN(name))
  //     return alert('Enter a valid name')
  //   dispatch(getNamePokemons(name))
  // }

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
    <div>
      <input
         id='searchbar-input'
         type='text'
        //  value={name}
         onKeyDown={handleKeyDown}
         placeholder='search pokemon by name'
         onChange={handleChange}
      />
      <button
         type='submit'
         onClick={(e) => handleSubmit(e)}
      >Search</button>
        
    </div>
  )
}

export default SearchBar