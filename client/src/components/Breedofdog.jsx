import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { filterDogue} from '../actions';
import style from './Breedofdog.module.css';



export default function Breedofdog () {
    const dispatch= useDispatch();
    const alldog = useSelector((state) => state.dogs)
    const [currentPage, setCurrentPage] = useState(1);
    let razadedog = alldog.map(e =>{
        let re = e.name.split('').join('');
        let perr = re
        return perr
    })
    const allraza = [...new Set(razadedog)]
    

    function handlefiltergogue (e) {
        dispatch(filterDogue(e.target.value));
       setCurrentPage(1)
   }

return(
    <div>
        <div>
        <select className={style.raza}onChange={(e)=> handlefiltergogue(e)}>
            <option value="" >Razas</option>
            <option value="all">Todas las razas de perro</option>
            {allraza.map((e)=> 
            <option name={e}>{e}</option>)}
            
        </select>
        </div>
    </div>
)

}
