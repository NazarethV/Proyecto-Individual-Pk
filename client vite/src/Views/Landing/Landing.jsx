import React from 'react';
import { Link } from 'react-router-dom';
import styles from './landing.module.css'; // Importa el archivo CSS de estilos

const Landing = () => {
  return (
    <div className={styles.landingContainer}>
      <h1 className={styles.landingTitle}>Welcome to the Pokemon World!</h1>
      <Link to="/home" className={styles.landingLink}>
        <button className={styles.landingButton}>Enter</button>
      </Link>
    </div>
  );
};

export default Landing;