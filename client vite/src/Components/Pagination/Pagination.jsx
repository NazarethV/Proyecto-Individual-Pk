import React from 'react'

// const Pagination = ({pokemonsPerPage, allPokemons, paginado}) => {
//   const pageNumbers = []

//   for (let i = 0; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
//     pageNumbers.push(i + 1);
// }

//   return (
//     <div>
//       <nav>

//       {pageNumbers && pageNumbers.map(number => (
//             <li  key = { number } >
//             <button onClick={() => paginado(number)}>{number}</button>
//             </li>
//           ))} 

//       </nav>

//     </div>
//   )
// }

const Pagination = ({ pokemonsPerPage, totalPokemons, paginado }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
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

export default Pagination