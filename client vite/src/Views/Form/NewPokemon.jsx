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
    types: [], // Cambia a null en lugar de un array vacío
  };

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const initialStateErrors = {
    name: 'Ingrese nombre del Pokemon',
    image: "'Ingrese URL de la imagen del Pokemon'",
    attack: 'Ingrese número de ataque',
    defense: 'Ingrese número de defensa',
    hp: 'Ingrese HP',
    speed: 'Ingrese velocidad',
    height: 'Ingrese altura',
    weight: 'Ingrese peso',
    types: 'Seleccione tipo',
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
    event.preventDefault()
    setForm({
      ...stateForm,
      types: [...stateForm.types, event.target.value]
    })

    setErrors(
      validations({
        ...stateForm,
        [event.target.name]: event.target.value
      })
    )
  }

  


  const handleChange2 = (event) => {
    // Obtener el ID del tipo seleccionado desde el evento del cambio
    const selectedTypeID = event.target.value;
  
    // Actualizar el estado de 'selectedTypes' y manejar la lógica de selección
    setSelectedTypes((selectedTypes) => {
      // Verificar si el tipo ya está presente en la lista de tipos seleccionados
      const isSelected = selectedTypes.some((type) => type.id === selectedTypeID);
  
      // Si el tipo ya está seleccionado, deseleccionarlo
      if (isSelected) {
        // Actualizar el estado del formulario para quitar el tipo deseleccionado
        setForm((stateForm) => ({
          ...stateForm,
          types: stateForm.types.filter((type) => type.id !== selectedTypeID),
        }));
        
        // Retornar una nueva lista de tipos seleccionados después de quitar el tipo deseleccionado
        return selectedTypes.filter((type) => type.id !== selectedTypeID);
      } else {
        // Si el tipo no está seleccionado, buscar el objeto de tipo correspondiente en la lista completa de tipos
        const selectedType = types.find((type) => type.id === selectedTypeID);
  
        // Actualizar el estado del formulario para agregar el nuevo tipo seleccionado
        setForm((stateForm) => ({
          ...stateForm,
          types: [...stateForm.types, selectedType],
        }));
  
        // Retornar una nueva lista de tipos seleccionados que incluye el nuevo tipo agregado
        return [...selectedTypes, selectedType];
      }
    });
  };



  const handleRemoveType = (typeId) => {
    setSelectedTypes(selectedTypes.filter((type) => type.id !== typeId));

    setForm({
      ...stateForm,
      types: stateForm.types.filter((type) => type.id !== typeId),
    });   
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    dispatch(createPokemon(stateForm))

  
    setForm(initialStateForm);
    setErrors(initialStateErrors);
    navigate('/home');
  };

  const disabledFunction = () => {
    return Object.values(stateErrors).some((error) => error !== '');
  };

  return (
    <div>
    <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
      <label>NAME POKEMON:</label>
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

      
      <label>HP POKEMON:</label>
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
      
      <label>ATTACK POKEMON:</label>
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

      <label>DEFENSE POKEMON:</label>
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

      <label>SPEED POKEMON:</label>
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

        <label>HEIGHT POKEMON:</label>
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


        <label>WEIGHT POKEMON:</label>
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


        <label>IMAGE POKEMON:</label>
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



      <div className={styles.selectTypes}>
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
             {stateForm.types.map((type) =>
                <span key={type}> {type} </span>)}
            </div>

            {/* <div>
              {selectedTypes.map((type) => (
                <div key={type.id}>
                  <span>{type.name}</span>
                  <button
                    type='button'
                    onClick={() => handleRemoveType(type.id)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div> */}

            {/* <div> 
              {stateErrors.types && typeof stateErrors.types === 'string' && 
                  <span>
                    {stateErrors.types}
                  </span> }
            </div> */}

            {/* <div>
              {selectedTypes.map((type) => (
                <div key={type.id}>
                  <span className={styles.types}>{type.name}</span>
                  <button
                    type="button"
                    className={styles.buttonX}
                    onClick={() => handleRemoveType(type.id)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div> */}
          </div>
        )}
        {stateErrors.types && (
          <p className={styles.error}>{stateErrors.types}</p>
        )}
        <br />

        {/*Object.values(stateErrors).length === 0 && (
          <button
            className={styles.buttonSubmit}
            disabled={disabledFunction()}
            type="submit"
          >
            Crear Pokemon
          </button>
        )*/}
        <button
            disabled={disabledFunction()}
            type="submit"
          >
            Crear Pokemon
          </button>
      </div>
    </form>
  </div>
);
};

export default NewPokemon;


