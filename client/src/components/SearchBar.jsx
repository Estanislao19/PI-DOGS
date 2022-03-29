import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import { getSearch} from '../actions';
import style from './SearchBar.module.css';
export default function SearchBar () {
    const dispatch = useDispatch();
    const [name,setName] = useState('')

     function handleInputChange(e){
     e.preventDefault();
    setName(e.target.value) 
    console.log(name)
     }

    function handleSubmit(e){ // el name va a ser mi estado local
        e.preventDefault();
            dispatch(getSearch(name));
            setName({
                name:"",
                
            })
    }



    
    return (
        <div className={style.sea}>
            <input className={style.search}
            type='text'
            value= {name.name}
            placeholder='buscar perros...'
            onChange= {(e)=>handleInputChange(e)}
            />
            <button className={style.btn}  onClick={(e)=>handleSubmit(e)} type="submit" >Buscar</button>
        </div>
    )
}