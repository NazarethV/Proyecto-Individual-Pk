
import React , { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTypes, createPokemon } from '../../Redux/Actions/actions';
import validations from '../../Utils/validations';
import styles from './newPokemon.module.css';

const NewPokemon = () => {
  const types = useSelector((state) => state.allTypes);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const initialStateForm = {
    name: '',
    image: '',
    attack: '',
    defense: '',
    hp: '',
    speed: '',
    height: '',
    weight: '',
    types: [], 
  };

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const initialStateErrors = {
    name: 'Enter Pokemon Name',
    image: 'Enter image URL',
    attack: 'Enter Attack number',
    defense: 'Enter Defense number',
    hp: 'Enter Hp number',
    speed: 'Enter Speed number',
    height: 'Enter Height number',
    weight: 'Enter Weight number',
    types: 'Select Type/Types',
  };

  const [selectedTypes, setSelectedTypes] = useState([]);
  const [stateForm, setForm] = useState(initialStateForm);
  const [stateErrors, setErrors] = useState(initialStateErrors);


 

  const handleChange = (event) => {
    //Validamos sólo el campo actual
    const validationErrors = validations({...stateForm, [event.target.name]: event.target.value})
    setErrors({ ...stateErrors, [event.target.name]: validationErrors[event.target.name]})
  
    setForm({
      ...stateForm,
      [event.target.name]: event.target.value
    })
  };


  const handleSelect = (event) => {
    event.preventDefault();

    // Verifica si el tipo ya está seleccionado antes de agregarlo
    if (!selectedTypes.some((type) => type.name === event.target.value)) {
      setSelectedTypes([...selectedTypes, { name: event.target.value }]);
    }

    setForm({
      ...stateForm,
      types: [...stateForm.types, event.target.value],
    });

    setErrors(
      validations({
        ...stateForm,
        [event.target.name]: event.target.value,
      })
    );
  };



  const handleRemoveType = (typeName) => {
    // Filtrar tipos en stateForm.types
    const updatedTypes = stateForm.types.filter((type) => type !== typeName);
    setForm({
      ...stateForm,
      types: updatedTypes,
    });
  
    // Filtrar tipos en selectedTypes
    const updatedSelectedTypes = selectedTypes.filter((type) => type.name !== typeName);
    setSelectedTypes(updatedSelectedTypes);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    
    dispatch(createPokemon(stateForm))
  
    setForm(initialStateForm);
    setErrors(initialStateErrors);
    // navigate('/home');
  };


  const disabledFunction = () => {
    const hasErrors = Object.values(stateErrors).some((error) => error !== '');
  
    // Verifico si el campo types está vacío por si se selecciona y elimina
    const isTypesEmpty = stateForm.types.length === 0;
  
    return hasErrors || isTypesEmpty;
  };


  return (
    
    <div className={styles.newDriverContainer}>
      <h2 className={styles.title}>NEW DRIVER</h2>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.formGroup}>
        <label>NAME:</label>
          <input
            type="text"
            name="name"
            value={stateForm?.name}
            onChange={handleChange}
          />
      {stateErrors.name ? (
        <p className={styles.error}>{stateErrors.name}</p>
      ) : (
        <p>
          <br />
        </p>
      )}
      </div>

      
      <div className={styles.formGroup}>
      <label>HP:</label>
      <input
        type="number"
        name="hp"
        value={stateForm.hp}
        onChange={handleChange}
      />
      {stateErrors.hp ? (
        <p className={styles.error}>{stateErrors.hp}</p>
      ) : (
        <p>
          <br />
        </p>
      )}
      </div>
      
      <div className={styles.formGroup}>
      <label>ATTACK:</label>
          <input
            type='number'
            name='attack'
            value={stateForm.attack}
            onChange={handleChange}/>

            {stateErrors.attack ? (
              <p className={styles.error}>{stateErrors.attack}</p>
            ) : (
              <p>
                <br />
              </p>
            )}
      </div>

      <div className={styles.formGroup}>
      <label>DEFENSE:</label>
          <input
            type='number'
            name='defense'
            value={stateForm.defense}
            onChange={handleChange}/>

            {stateErrors.defense ? (
              <p className={styles.error}>{stateErrors.defense}</p>
            ) : (
              <p>
                <br />
              </p>
            )}
      </div>

      <div className={styles.formGroup}>
      <label>SPEED:</label>
          <input
            type='number'
            name='speed'
            value={stateForm.speed}
            onChange={handleChange}/>

            {stateErrors.speed ? (
              <p className={styles.error}>{stateErrors.speed}</p>
            ) : (
              <p>
                <br />
              </p>
            )}
       </div>

       <div className={styles.formGroup}>
        <label>HEIGHT:</label>
          <input
            type='number'
            name='height'
            value={stateForm.height}
            onChange={handleChange}/>

            {stateErrors.height ? (
              <p className={styles.error}>{stateErrors.height}</p>
            ) : (
              <p>
                <br />
              </p>
            )}
        </div>


        <div className={styles.formGroup}>
        <label>WEIGHT:</label>
          <input
            type='number'
            name='weight'
            value={stateForm.weight}
            onChange={handleChange}/>

            {stateErrors.weight ? (
              <p className={styles.error}>{stateErrors.weight}</p>
            ) : (
              <p>
                <br />
              </p>
            )}
       </div>

       <div className={styles.formGroup}>
        <label>IMAGE:</label>
          <input
            type='text'
            name='image'
            value={stateForm.image}
            onChange={handleChange}/>

            {stateErrors.image ? (
              <p className={styles.error}>{stateErrors.image}</p>
            ) : (
              <p>
                <br />
              </p>
            )}
        </div>



        <div className={styles.formGroup}>
        <label>TYPES</label>
        {types.length === 0 ? (
          <p>No hay types disponibles</p>
        ) : (
          <div>
            <select name="types" onChange={(e)=> handleSelect(e)}>
              <option value="" disabled>
                Seleccione un tipo
              </option>
              {types.map((type) => (
                <option key={type.id} value={type.name}>
                  {type.name || 'renderizado type'}
                </option>
              ))}
            </select>


            <div>
                {selectedTypes.map((type) => (
                  <div key={type.name}>
                    <span>{type.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveType(type.name)}
                    >
                      X
                    </button>
                  </div>
                ))}
            </div>


          </div>
        )}
        {stateErrors.types && (
          <p className={styles.error}>{stateErrors.types}</p>
        )}
        <br />

        <button
            disabled={disabledFunction()}
            type="submit"
          >
            Create Pokemon
          </button>
      </div>
    </form>
  </div>
);
};

export default NewPokemon;

