import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'; // Importa useParams
import { getPokemonID } from '../../Redux/Actions/actions';

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Utiliza el hook useParams para obtener el ID directamente
  const pokemon = useSelector((state) => state.pokemonId);

  useEffect(() => {
    // Cuando el componente se monta, obtengo la información del Pokémon por su ID
    dispatch(getPokemonID(id));
  }, [dispatch, id]);

  return (
    <div>
      <h2>Pokemon Detail</h2>
      {pokemon ? (
        <div>
          <h3>{pokemon.name}</h3>

          <img src={pokemon.image} alt={`Imagen de ${pokemon.name}`} />
          
          
          {pokemon.types && (
            <p>Type: {Array.isArray(pokemon.types) ? pokemon.types.join(', ') : pokemon.types}</p>
          )}
          <p>HP: {pokemon.hp}</p>

          <p>Attack: {pokemon.attack}</p>
          
          <p>Defense: {pokemon.defense}</p>

          <p>height: {pokemon.height}</p>

          <p>weight: {pokemon.weight}</p>
          
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Detail;


// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { getPokemonID} from '../../Redux/Actions/actions'
// import { useParams } from 'react-router-dom'
// import { useEffect } from 'react'

// import styles from './detail.module.css'

// const Detail = () => {
//     const { id } = useParams()
//     const dispatch = useDispatch()
//     const pokemon = useSelector((state) => state.pokemonId)

//     console.log('pokemon en detail:' , pokemon)
//     //Acá "pokemon" muestra por ejemplo en types así: ['grass', 'poison']

//     // useEffect(() => {
//     //     dispatch(getPokemonID(id))
//     // }, [id])
//     useEffect(() => {
//       dispatch(getPokemonID(id))
//   }, [])

//   if(Object.values(pokemon).length === 0){
//     return (
//       <div>
//         <p>Pokemon not found</p>
//       </div>
//     )
//   }



//   return (
//     <div>
        
//         <h2>{ pokemon?.name}</h2>

//         <img src={pokemon.image} alt={pokemon.name}/>

//         <h3>
//             <p>TYPE: </p>
//             {/* Mapeo a través de los types y renderizar cada uno */}
//             {pokemon?.types && (
//                 <div>
//                     {pokemon.types.map((type, index) => (
//                       <span key={index} className={styles.type}>
//                           {type}
//                       </span>
//                     ))}
//                 </div>
//             )}
//         </h3>

//         <h2>Attack</h2>
//         <h3>{pokemon?.attack}</h3>

//         <h2>Defense</h2>
//         <h3>{pokemon?.defense}</h3>

//         <h2>Defense</h2>
//         <h3>{pokemon?.defense}</h3>

//         <h2>Hp</h2>
//         <h3>{pokemon?.hp}</h3>

//         <h2>Speed</h2>
//         <h3>{pokemon?.speed}</h3>

//         <h2>Height</h2>
//         <h3>{pokemon?.height}</h3>
        
//         <h2>Weight</h2>
//         <h3>{pokemon?.weight}</h3>

//     </div>
//   )
// }

// export default Detail