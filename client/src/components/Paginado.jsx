import React from "react";
import style from '../styles/Paginado.module.css'

export default function Paginado({ dogsPerPage, allDogs, paginado }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    //redondeo para arriba
    pageNumbers.push(i); //Creo un array con los numeros de paginas
  }
  return (
    //Renderizo el paginado
    <nav>
      <ul className={style.paginado}>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li key={number} >
              <a onClick={() => paginado(number)}>{number}</a>
            </li>
          ))}
      </ul>
    </nav>
  );
}
