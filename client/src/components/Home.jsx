import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useState,useEffect } from 'react';
import {Link} from 'react-router-dom';
import { filterCreated,filterDogue,filterOrderName, filterOrderWeight, filtertemeperament, getDogs, getTemperament, resetPaginado} from '../actions';
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';

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
   const allTemperament = useSelector((state) => state.temperament)
   

    const paginado=(pageNumber) =>{
        setCurrentPage(pageNumber)
    }
    
    useEffect(()=>{
        dispatch(getDogs())
    },[dispatch]);
    
    function handleClick (e) {
      
        dispatch(getDogs());
       
    } 
    function handleFilterOrderName (e) {
      
        dispatch(filterOrderName(e.target.value))
        setOrderAZ(`Ordenado ${e.target.value}`);
        
    }
    function handleFilterCreated(e){
        setCurrentPage(1)
        dispatch(filterCreated(e.target.value))
       
    }
    function handlefilterOrderWeight(e){
     
        dispatch(filterOrderWeight(e.target.value))
        setOrder(`Ordenado ${e.target.value}`)
    }
    let razadedog = allDogs.map(e =>{
      let re = e.name.split('').join('');
      let perr = re
      return perr
  })
  const allraza = [...new Set(razadedog)]
  

  function handlefiltergogue (e) {
      dispatch(filterDogue(e.target.value));
     setCurrentPage(1)
 }
 
 useEffect(() => {
  dispatch(getTemperament())
},[dispatch])

function handleChange(e) {
dispatch(filtertemeperament(e.target.value))
setCurrentPage(1)
}


    return(
        <div className={style.container}>
            <Link to ='/dogs' className={style.cree}>Crear una nueva raza de perro</Link>
            <h1 className={style.title}>PAGINA DE PERROS</h1>
            <SearchBar/>
            <button className={style.carg} onClick={e=> {handleClick(e)}}>Volver a cargar todos los perros</button>
            
            <div>
                <select  className={style.az} onChange={(e)=>handleFilterOrderName(e)}> 
                    <option >Ordenamiento alfabetico de las razas de los perros</option>
                    <option value="asc"> A-Z</option>
                    <option value="desc"> Z-A</option>
                </select>
                <select className={style.az} onChange={(e)=>handleFilterCreated(e)}>
               
                  <option value="all">Razas existentes</option>
                  <option value="created">Razas creadas por nosotros</option>
                </select>
                <select  className={style.az}onChange={(e)=>handlefilterOrderWeight(e)}>
                  <option >Ordenamiento de las razas de perro por peso</option>
                <option value="menor_mayor"> Mayor a menor peso</option>
            <option value="mayor_menor">menor a mayor peso</option>
                </select>
                
              
          
                <select className={style.raza}onChange={(e)=> handlefiltergogue(e)}>
            <option value="" >Razas</option>
            <option value="all">Todas las razas de perro</option>
            {allraza.map((e)=> 
            <option name={e}>{e}</option>)}
            
        </select>
       
                <Paginado
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          paginado={paginado}
          setCurrentPage={setCurrentPage}
        />
       { <select className={style.temperament}onChange={(e) => handleChange(e)}>
        <option >Filtro por temperamento</option>
        {allTemperament?.map(e=>(<option value='all' key={e.id} value={e.name}>{e.name}</option>))}
            </select>}
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
                  
                />
              </Link>
            </div>
          );
        })}
                
            </div>
        </div>
    )
    


}