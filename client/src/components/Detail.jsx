import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useParams,useNavigate } from 'react-router';
import style from './Detail.module.css';


export default function Detail(){
    const dispatch = useDispatch();
    const { id }= useParams();
    const navigate= useNavigate();
    useEffect(() => {
        dispatch(getDetail(id));
    }, [dispatch, id])
    const navegacion =() =>{
      navigate("/home");
    }

    const perro = useSelector((state) => state.detail)

    return(
        <div className={style.container} >
            {
                perro.length > 0 ?
                <div className={style.cont} >
                    <h1 className={style.title}>{perro[0].name}</h1>
                    <img className={style.img} src={perro[0].image} alt="Img not found" />
                    <h3 className={style.wei}> Weight: {perro[0].weight} Kg</h3>
                    <h3 className={style.hei}> Height: {perro[0].height} Cm</h3>
                   
                    <h3 className={style.life}> Life span: {perro[0].createdDb ? perro[0].life_span + " years" : perro[0].life_span} </h3>
                    <h3 className={style.temp}> Temperaments: {!perro[0].createdDb? perro[0].temperament + ' ' : perro[0].temperaments.map(e => e.name + (', '))} </h3>
                    <button className={style.btn} onClick={navegacion}>HOME</button>
                    
                </div> : 
                <p>Loading... </p>
            }
        </div>
    )
}