import React,{useState,useEffect} from "react";

import style from './Paginado.module.css';
import {useDispatch} from 'react-redux'

export default function Paginado({ dogsPerPage, allDogs, paginado}) {
  const pageNumbers = [];
  const dispatch = useDispatch()
  
  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i);//para que arranque en la pág 1, sino arrancaba en pág 0
  
  }
  

  return (
    
    <nav className={style.nav} >
      <ul >
        {pageNumbers &&
          pageNumbers.map((number) => ( 
                <button className={style.ul}  onClick={() => paginado(number)} >{number}</button>
          ))}
          
     </ul>
    </nav>
  );
}