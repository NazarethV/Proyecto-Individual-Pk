

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './pokemon.module.css';

const Pokemon = ({ id, name, image, types }) => {
  return (
    <div>
      <Link to={`/detail/${id}`} className={styles.link}>
        <div className={styles.card}>
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
            <p className={styles.type}>Type: {types && types.join(" ")}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Pokemon;

