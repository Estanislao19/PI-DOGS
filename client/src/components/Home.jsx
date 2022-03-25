import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useState,useEffect } from 'react';
import {Link} from 'react-router-dom';
import { filterCreated, filterHeight, filterOrderName, filterOrderWeight, getDogs, } from '../actions';
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import FiltTemperament from './FiltTemperament';
import Breedofdog from './Breedofdog';
import style from './Home.module.css';



export default function Home (){
   const dispatch=useDispatch();
   const allDogs = useSelector((state)=>state.dogs) 
   console.log('e',allDogs);
   const [currentPage, setCurrentPage] = useState(1); // siempre empeza en la página n1
   const [dogsPerPage, setDogsPerPage] = useState(8); // dogs por página
   const indexOfLastDog = currentPage * dogsPerPage;
   const indexOfFirstDog = indexOfLastDog - dogsPerPage;
   const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);//0/8 (el ultimo es excluyente, por eso hay 8 del 0 al 7)
   const [orderAZ,setOrderAZ] =useState('');
   const [order,setOrder] =useState('');
   const [orderr,setOrderH] =useState('')
  // const allTemp = useSelector((state) => state.temperament)
 // console.log('io', allTemp)
   

   
    const paginado=(pageNumber) =>{
        setCurrentPage(pageNumber)
    }
    
    useEffect(()=>{
        dispatch(getDogs())
    },[dispatch]);
    
    function handleClick (e) {
        e.preventDefault();
        dispatch(getDogs());
    } 
    function handleFilterOrderName (e) {
      e.preventDefault();
        dispatch(filterOrderName(e.target.value))
     
        setOrderAZ(`Ordenado ${e.target.value}`);
    }
    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
        
    }
    function handlefilterOrderWeight(e){
      e.preventDefault();
      
        dispatch(filterOrderWeight(e.target.value))
        setOrder(`Ordenado ${e.target.value}`)
    }
    function handlefilterHeight(e){
      dispatch(filterHeight(e.target.value))
      setOrderH(`ordenado${e.target.value}`)
    }
  
    

    return(
        <div className={style.container}>
            <Link to ='/dogs' className={style.cree}>Crear una nueva raza de perro</Link>
            <h1 className={style.title}>MI PAGINA DE PERROS</h1>
            <SearchBar/>
            <button className={style.carg} onClick={e=> {handleClick(e)}}>Volver a cargar todos los perros</button>
            
            <div>
                <select  className={style.az} onChange={(e)=>handleFilterOrderName(e)}> 
                    
                    <option value="asc"> A-Z </option>
                    <option value="desc">Z-A</option>
                </select>
                <select className={style.az} onChange={(e)=>handleFilterCreated(e)}>
               
                  <option value="api">Existing</option>
                  <option value="created">Created</option>
                </select>
                <select className={style.az}onChange={(e)=>handlefilterOrderWeight(e)}>
                <option value="menor_mayor">Mayor a menor peso</option>
            <option value="mayor_menor">menor a mayor peso</option>
                </select>
                {/*<select onChange={(e) =>handlefilterHeight(e)}>
                <option value="altura_maxima">altura maxima</option>
                <option value="altura_minima">altura minima</option>
    </select>*/}
              
          
              <Breedofdog/>
                <Paginado
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          paginado={paginado}
        />
        <FiltTemperament/>
      </div>
      <div >
        {currentDogs?.map((e) => {
          return (
            <div key={e.id} >
              <Link to={`/dogs/${e.id}`} >
                <Card
                  name={e.name}
                  image={e.image}
                  temperament={ e.temperament}
                 weight={e.weight }
                  //height={ e.height }
                />
              </Link>
            </div>
          );
        })}
                
            </div>
        </div>
    )
    


}