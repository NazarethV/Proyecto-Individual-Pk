

import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePokemonById, getPokemons } from '../../Redux/Actions/actions';
import { Link } from 'react-router-dom';

import styles from './pokemon.module.css';

const Pokemon = ({ id, name, image, types }) => {
  const dispatch = useDispatch();

  const handleDeletePokemon = async (id) => {
    try{ 
      const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este Pokémon de la base de datos?");

      if (confirmDelete) {
          dispatch(deletePokemonById(id));
          // Puedes realizar alguna acción adicional después de eliminar el Pokémon, como actualizar la lista de pokémons mostrada en la página.
          dispatch(getPokemons());
      } else {
          // Aquí puedes manejar la lógica si el usuario cancela la eliminación
          console.log("Eliminación cancelada por el usuario.");
      }
      
    }catch(error){
      console.error('Error al eliminar el Pokémon:', error);
    }};

  return (
    <div>
     
        <div className={styles.card}>
        <Link to={`/detail/${id}`} className={styles.link}>
          <h3 className={styles.name}>{name}</h3>
          <div className={styles.image}>
            <img
              src={image}
              width="120px"
              height="150px"
              alt="Image not found"
            />
          </div>
          <div className={styles.typeContainer}>
            <p className={styles.type}>Type: {types && types.join(", ")}</p>
          </div>
          </Link> 

        {/* Si no es un numero renderizar el botón para eliminar */}
         {isNaN(id) ? 
          <button className={styles.buttonDelete} onClick={() => handleDeletePokemon(id)}> X </button>
                    :
            <p className={styles.notRemoved} >from the api is not removed</p>
        } 
          
        </div>
     
    </div>
  );
};

export default Pokemon;





