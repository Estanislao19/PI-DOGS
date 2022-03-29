import React from 'react';
import style from './Card.module.css';

export default function Card({image,name,weight,temperament}) {
    return (
        <div className={style.container}>
        <h3 className={style.name}>{name}</h3>
        <h5 className={style.wei}>{weight}KG</h5>
        <img className={style.img} src={image} alt="Img not found" width = '200px' height = '250px' />
        <p className={style.temp}>{temperament}</p>
        </div>
    )
}