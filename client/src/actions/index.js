import axios from 'axios';


export function getDogs() {
return async function (dispatch){
   var json = await axios.get('/dogs')
   return dispatch({
    type:'GET_DOGS',
    payload:json.data
   })
}
}     





export function filterOrderName (payload) {
    return {
        type:"FILTER_ORDER_BY_NAME",
        payload,
    }
}

export function filterCreated (payload){
    return{
        type:'FILTER_BY_CREATED',
        payload
    }
}
export function filterOrderWeight (payload){
    return {
        type:'FILTER_BY_ORDER_WEIGHT',
        payload
    }
}
export function filtertemeperament (payload){
    return {
        type:'FILTER_BY_TEMPERAMENT',
        payload
    }
}
export function getSearch (name){
   
   return function (dispatch){
       axios.get('/dogs?name=' + name)
       .then(res=>{
           dispatch({
               type:'GET_SEARCH',
               payload:res.data
               
           })
       }).catch(error=>
        alert('no se encuentra el perro que estas buscando'))
   }
   
}

export function getTemperament () {
    return async function (dispatch) {
     var json = await axios.get('/temperament',{});
     return dispatch({
         type:'GET_TEMPERAMENT',
         payload:json.data,
     })   
    }
}

export function postDogs (payload){
    return async function (dispatch) {
        var json = await axios.post('/dog' , payload);
        return dispatch({
            type: 'POST_DOGS',
            json
        }) 
      }
    }

    

       
export  function getDetail (id) {
    return async function (dispatch) {
        var json = await axios.get(`/dogs/${id}`);
        return dispatch({
            type:'GET_DETAIL',
            payload:json.data
            
        })
    }
    
    
}



    
export function filterdog (payload) {
    return {
        type:'FILTER_DOG',
        payload
    }
}
export function filterDogue (payload) {
    return {
        type:'FILTER_DOGUE',
        payload
    }
}

export function resetDogDetail(payload) {
    return {
        type:'RESET_DOGS',
        payload
    }
}
export function resetPaginado (payload){
    return {
        type:'RESET_PAGINADO',
        payload
    }
}