import {Link} from 'react-router-dom';
import React from 'react';
import style from'./LandingPage.module.css';

export default function LandingPage(){
    return (
        <div className={style.container}>
             
            <h1 className={style.title}>Bienvenido a mi pagina de perros</h1>
            <Link to='/home' ><button className={style.btn}>Ingresar</button></Link>
        </div>
    )
}