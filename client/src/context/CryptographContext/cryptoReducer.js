import {
    ENCRYPT_SUCCESS,
    ENCRYPT_ERROR
} from '../../types'

export default (state, {type, payload}) =>{
    switch(type){
        
        case ENCRYPT_SUCCESS:
            console.log(payload)
            return{
                ...state,
                encrypt:payload
            }
        case ENCRYPT_ERROR:
            return{
                ...state,
                encrypt:payload
            }  
        default:
            return state      
    }
}