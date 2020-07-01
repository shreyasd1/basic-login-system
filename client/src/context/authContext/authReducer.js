import {
    SUCCESS_LOGIN,
    SUCCESS_REGISTER,
    ERROR_LOGIN,
    ERROR_REGISTER,
    USER_DATA,
    ERROR_USER_DATA,
    LOGOUT
} from '../../types'

export default (state,action) =>{
    switch(action.type){
        case USER_DATA:
            return{
                ...state,
                userAuth:true,
                user:action.payload,
                errors:null
            }
        case SUCCESS_REGISTER:
        case SUCCESS_LOGIN:
            localStorage.setItem('token',action.payload.token)
            return{
                ...state,
                userAuth:true,
                errors:null
        }
        case ERROR_REGISTER:
        case ERROR_LOGIN:
        case ERROR_USER_DATA:
        case LOGOUT:
            localStorage.removeItem('token')
            return{
                ...state,
                user:null,
                userAuth:false,
                errors:action.payload
            }

        default :
        return state
    }

}