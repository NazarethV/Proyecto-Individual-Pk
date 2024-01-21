import React from 'react'
import styles from './pokemon.module.css'
import { Link } from 'react-router-dom'


const Pokemon = ({id, name, image, types}) => {
  return (
    <div>
        <Link to={`/detail/${id}`} className={styles.link}>

            <div className={styles.card}>
                <h3>{name}</h3>

                <div className={styles.image}>
                    <img 
                        src={image}
                        width="120px"
                        height="150px"
                        alt="Image not found"
                        />
                </div>

                <p>Type: {types && types.join(" ")}</p>

            </div>

        </Link>

    </div>
  )
}

export default Pokemon

