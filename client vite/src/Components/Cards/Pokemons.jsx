import React from 'react'
import styles from './pokemons.module.css'
import Pokemon from '../Card/Pokemon'

const Pokemons = ({allPokemons}) => {//Recibe desde home el estado global con la info de todos los pokemons
  return (
    <div className={styles.cardContainer}>
        <div className={styles.cardCont}>
        {/*Mapeamos todos los pokemons que recibo y por cada pokemon renderizo una Card pasandole los datos*/}
        {allPokemons?.map(pokemon =>
            <Pokemon 
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.image}
                types={pokemon.types}
              

                />
        )} 

        </div>

    </div>
  )
}

export default Pokemons