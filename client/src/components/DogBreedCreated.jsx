import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getTemperament, postDogs} from '../actions';
import style from './DogBreedCreated.module.css';


function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Debo completar nombre";
  } else if (!input.wMin) {
    errors.wMin = "Debo completar el peso minimo";
  } else if (input.wMin <= 0) {
    errors.wMin = "El peso minimo debe ser mayor que 0";
  } else if (!input.wMax) {
    errors.wMax = "Debo completar el peso maximo";
  } else if (input.wMax <= 0) {
    errors.wMax = "El peso maximo debe ser mayor que 0";
  } else if (parseInt(input.wMin) >= parseInt(input.wMax)) {
    errors.wMax = "El peso máximo debe ser mayor que el peso mínimo";
  } else if (!input.hMin) {
    errors.hMin = "Se requiere altura minima";
  } else if (input.hMin <= 0) {
    errors.hMin = "La altura mínima debe ser mayor que cero";
  } else if (!input.hMax) {
    errors.hMax = "Se require altura maxima";
  } else if (input.hMax <= 0) {
    errors.hMin = "La altura mínima debe ser mayor que cero";
  } else if (parseInt(input.hMin) >= parseInt(input.hMax)) {
    errors.hMax = "La altura máxima debe ser mayor que la altura mínima";
  } else if (!input.life_spanMin) {
    errors.life_spanMin = "Se requiere una vida útil mínima";
  } else if (input.life_spanMin <= 0) {
    errors.life_spanMin = "La vida útil mínima debe ser mayor que cero";
  } else if (!input.life_spanMax) {
    errors.life_spanMax = "Se requiere una vida útil máxima";
  } else if (input.life_spanMax <= 0) {
    errors.life_spanMax = "La vida útil mínima debe ser mayor que cero";
  } else if (parseInt(input.life_spanMin) >= parseInt(input.life_spanMax)) {
    errors.life_spanMax = "La vida útil máxima debe ser mayor que la mínima";
  } else if (!input.image) {
    errors.image = "Inserte la URL de la imagen de Internet";
  }
  return errors;
}

export default function DogBreedCreated() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const temperaments = useSelector((state) => state.temperament)
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    wMin: "",
    wMax: "",
    hMin: "",
    hMax: "",
    life_spanMin: "",
    life_spanMax: "",
    image: "",
    createdInDb:"",
    temperaments: [],
  });
  
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    setInput({
      ...input,
      temperaments: [...input.temperaments,e.target.value],
    });
  }
  

  function handleDelete(e) {
    setInput({
      ...input,
      temperament: input.temperament.filter((el) => el !== e),
    });
  }

  function handleSubmit(e) {
    if (
      !input.name ||
      !input.wMin ||
      !input.wMax ||
      !input.hMin ||
      !input.hMax ||
      !input.life_spanMin ||
      !input.life_spanMax ||
      !input.image ||
      !input.temperaments
    ){
     e.preventDefault();
     alert ('debe completar formulario')
    }else {
     const formCompleto = {
      name: input.name,
      weight: input.wMin + " - " + input.wMax,
      height: input.hMin + " - " + input.hMax,
      life_span: input.life_spanMin + " - " + input.life_spanMax,
      image: input.image,
      temperament: input.temperaments,
    };
    e.preventDefault();
    dispatch(postDogs(formCompleto));
    alert("tu perro ha sido creado con exito");
    setInput({
      name: "",
      wMin: "",
      wMax: "",
      hMin: "",
      hMax: "",
      life_spanMin: "",
      life_spanMax: "",
      image: "",
      createdInDb:"",
      temperaments: [],
    });
  }
    navigate("/home");
  }

  useEffect(() => {
    dispatch(getTemperament());
  }, [dispatch]);

  return (
    <div className={style.container} >
      <h1 className={style.title}>CREEMOS ALGO NUEVO!</h1>
      <div className={style.todo} >
      <Link to="/home" >
        <button className={style.btn}> Ir a la home</button>
      </Link>
      
        <form className={style.form}
         
          onSubmit={(e) => handleSubmit(e)}
          >

         
          <div >
           <label className={style.nam}>Name:</label> 
            <input
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
              placeholder="Name..."
              className={style.name}
              autoComplete="off"
            />
            {errors.name && <p >{errors.name}</p>}
          </div>

        
          <div >
            <label className={style.w}>Weight:</label>
            <input
              type="number"
              value={input.wMin}
              name="wMin"
              onChange={(e) => handleChange(e)}
              placeholder="Min weight (Kg)"
              className={style.wei}
            />
            <input
              type="number"
              value={input.wMax}
              name="wMax"
              onChange={(e) => handleChange(e)}
              placeholder="Max weight (Kg)"
             className={style.weim}
            />
            {errors.wMin && <p >{errors.wMin}</p>}
            {errors.wMax && <p >{errors.wMax}</p>}
          </div>

         
          <div >
            <label className={style.hei}>Height:</label>
            <input
              type="number"
              value={input.hMin}
              name="hMin"
              onChange={(e) => handleChange(e)}
              placeholder="Min height (Cm)"
              className={style.he}
            />
            <input
              type="number"
              value={input.hMax}
              name="hMax"
              onChange={(e) => handleChange(e)}
              placeholder="Max height (Cm)"
              className={style.hew}
            />
            {errors.hMin && <p >{errors.hMin}</p>}
            {errors.hMax && <p >{errors.hMax}</p>}
          </div>

         
          <div >
            <label className={style.span}>Life span:</label> 
            <input
              type="number"
              value={input.life_spanMin}
              name="life_spanMin"
              onChange={(e) => handleChange(e)}
              placeholder="Min life span"
              className={style.life}
            />
            <input
              type="number"
              value={input.life_spanMax}
              name="life_spanMax"
              onChange={(e) => handleChange(e)}
              placeholder="Max life span"
              className={style.lifee}
            />
            {errors.life_spanMin && (
              <p >{errors.life_spanMin}</p>
            )}
            {errors.life_spanMax && (
              <p >{errors.life_spanMax}</p>
            )}
          </div>

          <div >
            <label className={style.img}>Image:</label> 
            <input
              type="text"
              value={input.image}
              name="image"
              onChange={(e) => handleChange(e)}
              placeholder="Image url..."
              className={style.image}
            />
            {errors.image && <p >{errors.image}</p>}
          </div>

          <div >
          <select className={style.teme} onChange={handleSelect}>
                                        {
                                            temperaments.map((e) => 
                                            <option value={e.name}>{e.name} </option>
                                            
                                            )
                                            
                                        }
                                     
                                    </select>
                                    <ul>{input.temperaments.map((e) =>( 
                                    <div>
                                    <li >{e}</li> 
                                    <button
                                    className={style.btnn}
                                    type='button'
                                    onClick={() => handleDelete(e)}
                                   
                                     >
                                    X
                                  </button>
                                  </div>
                                    ))}</ul>
          </div>
           <button className={style.btn} type='submit'>Create Videogame</button>
        </form>
        <div >
        
        </div>
      </div>
    
    </div>
  );
}
