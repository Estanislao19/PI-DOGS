const initialState ={
    dogs:[],
    allDogs:[],
    temperament:[],
    detail:[],
    
}


function rootReducer (state=initialState,action) {
switch(action.type){
    case 'GET_DOGS':
        return {
            ...state,
            dogs:action.payload,
            allDogs:action.payload,
        }
        case 'FILTER_ORDER_BY_NAME':
         const ordername = action.payload === "asc" ?
         state.dogs.sort(function (a, b) {
             if(a.name > b.name){
             return 1;
             }
             if(a.name < b.name){
                 return -1;
             }
             return 0;
         }): 
         state.dogs.sort(function (a, b) {
             if(a.name > b.name){
                 return -1;
             }
             if(a.name < b.name){
                 return 1
             }
             return 0;
         })
         return {
             ...state,
             dogs:ordername,
         }
         case 'FILTER_BY_CREATED': 
         const allDogs = state.allDogs
        const filterCreated = action.payload === 'created' ? allDogs.filter (el => el.createdInDb) : allDogs.filter(el => !el.createdInDb)
        return {
            ...state,
            dogs: filterCreated
        }
         case 'POST_DOGS':
             return {
                 ...state
             }
             case 'GET_TEMPERAMENT':
                 return {
                     ...state,
                     temperament:action.payload
                 }
                 case 'GET_DETAIL': 
                 return {
                     ...state,
                     detail:action.payload
                 }

            case "FILTER_BY_ORDER_WEIGHT":
                let sorted_Arr =action.payload === "menor_mayor" ?
                   state.dogs.sort(function (a, b) {
                   
                        if (a.weight > b.weight) {
                            return -1;
                        }
                        if (a.weight < b.weight) {
                            return 1;
                        }
                        return 0;
                    })
                    : state.dogs.sort(function (a, b) {
                        if(a.weight >b.weight) {
                            return 1;
                        }
                        if(a.weight < b.weight) {
                            return -1;
                        }
                        return 0;
                    });
                return {
                  ...state,
                  dogs: sorted_Arr,
                };
                case 'FILTER_BY_TEMPERAMENT':
              
            const tempDogs = state.allDogs
                let tempFiltered = tempDogs.filter( e => {
                    if(e.temperament) {
                        return e.temperament.includes(action.payload)
                    }
                    if(e.temperamenti) {
                        let temps = e.temperamenti.map(e => e.name);
                        return temps.includes(action.payload);
                    }
                    return null
                })
            return {
                ...state,
                dogs : tempFiltered
            }
              
                case 'GET_SEARCH' :
                    return {
                        ...state,
                        dogs:action.payload
                    }
                   case 'FILTER_DOGUE':
                       let raza =state.dogs;
                           let can = action.payload === 'all' ? raza : raza.filter((el)=>el.name.includes(action.payload));
                           return{
                               ...state,
                               dogs:can
                           }
                   
                        case 'RESET_DOGS':
                            return{
                                ...state,
                                detail:[]
                            }
                  case 'RESET_PAGINADO':
                      return{
                          ...state,
                          
                    
                      }

                        
                          
                       

        default:
            return state;
}
}
export default rootReducer;