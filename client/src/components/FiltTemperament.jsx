import React,{useEffect, useState} from "react";
import {filtertemeperament, getTemperament} from '../actions';
import {useDispatch, useSelector} from 'react-redux';
import style from './FiltTemperament.module.css';

export default function FiltTemperament () {
const dispatch = useDispatch();
const allTemperament = useSelector((state) => state.temperament)

useEffect(() => {
    dispatch(getTemperament())
},[dispatch])

function handleChange(e) {
dispatch(filtertemeperament(e.target.value))

}


return (
    <div>
        <select className={style.temperament}onChange={(e) => handleChange(e)}>
        <option>Filtro por temperamento</option>
        {allTemperament?.map(e=>(<option key={e.id} value={e.name}>{e.name}</option>))}
        </select>
    </div>
)
}

