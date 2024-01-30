import React from 'react'


//no muestre números de página si no hay pokemons para mostrar
// const Pagination = ({ pokemonsPerPage, totalPokemons, paginado }) => {
//   const pageNumbers = [];

//   console.log('Inicio: Total de Pokemons:', totalPokemons);
//   console.log('Inicio: Números de Página:', pageNumbers);

//   for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
//       pageNumbers.push(i);
//   }

//   if (pageNumbers.length === 0) {
//       return null; // No hay necesidad de mostrar paginado si no hay pokemons en la página
//   }

//   return (
//       <div>
//           <nav>
//               <ul className="pagination">
//                   {pageNumbers.map((number) => (
//                       <li key={number} className="page-item">
//                           <button onClick={() => paginado(number)} className="page-link">
//                               {number}
//                          </button>
//                        </li>
//                    ))}
//                </ul>
//            </nav>
//        </div>
//    );
//  };

//  export default Pagination;



const Pagination = ({ pokemonsPerPage, pokemons, paginado }) => {
  const totalPokemons = pokemons.length;
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
      pageNumbers.push(i);
  }

  if (pageNumbers.length === 0) {
      return null; // No hay necesidad de mostrar paginado si no hay pokemons en la página
  }

  return (
      <div>
          <nav>
              <ul className="pagination">
                  {pageNumbers.map((number) => (
                      <li key={number} className="page-item">
                          <button onClick={() => paginado(number)} className="page-link">
                              {number}
                          </button>
                      </li>
                  ))}
              </ul>
          </nav>
      </div>
  );
};

export default Pagination;








