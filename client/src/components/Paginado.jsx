import React from "react";
import style from './Paginado.module.css';

export default function Paginado({ dogsPerPage, allDogs, paginado }) {
  const pageNumbers = [];

  for (let i = 0; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i + 1);//para que arranque en la pág 1, sino arrancaba en pág 0
  }

  return (
    <nav className={style.nav} >
      <ul >
        {pageNumbers &&
          pageNumbers.map((number) => (
                <button className={style.ul} onClick={() => paginado(number)} >{number}</button>
          ))}
     </ul>
    </nav>
  );
}