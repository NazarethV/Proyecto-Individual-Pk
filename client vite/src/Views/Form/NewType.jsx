import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createType } from '../../Redux/Actions/actions';
import styles from './newType.module.css'; // Importa tus estilos CSS aquí

const NewType = () => {
  const dispatch = useDispatch();
  const [typeName, setTypeName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createType({ name: typeName }));
    setTypeName(''); // Limpiar el campo después de enviar el formulario
  };

  return (
    <div className={styles.newTypeContainer}>
      <h2 className={styles.title}>Create New Type</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Type Name:</label>
          <input
            type="text"
            value={typeName}
            onChange={(e) => setTypeName(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>Create Type</button>
      </form>
    </div>
  );
};

export default NewType;