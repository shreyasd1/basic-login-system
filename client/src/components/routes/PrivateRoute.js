import React from 'react'
import jwt from 'jsonwebtoken'
import {Route , Redirect} from 'react-router-dom'


const PrivateRoute = ({component: Component, ...rest}) => {
    const lStorage = localStorage.getItem('token')
    try {
        var verified = jwt.verify(lStorage,'my secret key')
    } catch (error) {
        console.log('token not found')
    }

    return (
       <Route
       {...rest}
       render = {props => !verified ? (<Redirect to="/" />):(<Component {...props} />)}
       />
    )
}

export default PrivateRoute
