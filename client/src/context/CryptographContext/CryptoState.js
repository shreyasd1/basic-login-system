import React,{useReducer} from 'react'
import CryptoContext from './cryptoContext'
import CryptoReducer from './cryptoReducer'
import setToken from '../../utils/setToken'
import axios from 'axios'

import {
    ENCRYPT_ERROR,
    ENCRYPT_SUCCESS
} from '../../types'


const CryptoState = (props) => {
    const initialState ={
        encrypt:null
    }
    const [state, dispatch] = useReducer(CryptoReducer, initialState)

   // function to encrypt data
   const encryptData = async (data) =>{
    const config ={
        header:{
            'Content-Type' : 'application/json'
        }
    }
    try {
        const res = await axios.post('/crypt',data,config)
        dispatch({
            type:ENCRYPT_SUCCESS,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:ENCRYPT_ERROR,
            paylaod:error.response.data
        })
    }
}
    return (
       <CryptoContext.Provider
       value={{
            encrypt:state.encrypt,
            encryptData
            
       }}
       >{props.children}</CryptoContext.Provider>
    )
}

export default CryptoState
