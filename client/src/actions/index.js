import axios from 'axios';

/*export function getDogs () {
    return async function (dispatch){
        var json= await axios.get('http://localhost:3001/dogs')
        return dispatch({
            type:'GET_DOGS',
            payload:json.data
        })
    }
}*/

export function getDogs() {
return  function (dispatch){
    axios.get('http://localhost:3001/dogs')
    .then(res=>{
        dispatch({
            type:'GET_DOGS',
            payload:res.data
        })
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
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/dogs?name=' + name);
        return dispatch({
            type:'GET_SEARCH',
            payload:json.data
        })
    }
}
/*export function getTemperament () {
    return async function (dispatch) { 

    var json =await axios.get('http://localhost:3001/temperament')
    return dispatch({
        type:'GET_TEMPERAMENT',
        payload:json.data
    })
    }
}*/
export function getTemperament () {
    return function (dispatch) {
        axios.get('http://localhost:3001/temperament')
        .then(res=>{
             dispatch({
                type:'GET_TEMPERAMENT',
                payload:res.data
            })
        })
    }
}
export function postDogs (payload){
    return async function (dispatch) {
        var json = await axios.post('http://localhost:3001/dog' , payload);
        return json
      }
    }
/*export function postDogs (payload) {
    axios({
        ulr:'http://localhost:3001/dog',
        method:'POST',
        data:payload
    }).then(function (response) {
        console.log(response.data)
    })
} */
/*axios({
    url: 'data.php',
    method: 'POST',
    data: data
}).then(function (response) {
    console.log(response.data);
}).catch(function (error) {
    console.log(error.response.statusText);
});*/
       
export  function getDetail (id) {
    return async function (dispatch) {
        var json = await axios.get(`http://localhost:3001/dogs/${id}`);
        return dispatch({
            type:'GET_DETAIL',
            payload:json.data
            
        })
    }
    
    
}
   
export function filterByTemeperament (payload) {
    return {
        type:'FILTER_TEMPERAMENT',
        payload
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
export function filterHeight (payload) {
    return{
        type:'FILTER_HEIGHT',
        payload
    }
}