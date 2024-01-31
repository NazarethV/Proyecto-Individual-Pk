import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'; // Importa useParams
import { getPokemonID } from '../../Redux/Actions/actions';

import styles from './detail.module.css';

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Utiliza el hook useParams para obtener el ID directamente
  const pokemon = useSelector((state) => state.pokemonId);

  useEffect(() => {
    // Cuando el componente se monta, obtengo la información del Pokémon por su ID
    dispatch(getPokemonID(id));
  }, [dispatch, id]);

  return (
    <div className={styles.detailContainer}>
      <h2 className={styles.detailTitle}>Pokemon Detail</h2>
      {pokemon ? (
        <div className={styles.detailContent}>
          <h3>{pokemon.name}</h3>
          <img src={pokemon.image} alt={`Imagen de ${pokemon.name}`} className={styles.detailImage} />
          <div className={styles.detailTypes}>
            {pokemon.types && (
              <p>Type: {Array.isArray(pokemon.types) ? pokemon.types.join(', ') : pokemon.types}</p>
            )}
          </div>
          <p>HP: {pokemon.hp}</p>
          <p>Attack: {pokemon.attack}</p>
          <p>Defense: {pokemon.defense}</p>
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
        </div>
      ) : (
        <p className={styles.detailLoading}>Loading...</p>
      )}
    </div>
  );
};

export default Detail;

