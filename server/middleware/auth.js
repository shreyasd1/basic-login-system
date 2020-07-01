require('dotenv').config()
const jwt = require('jsonwebtoken')

const auth = (req,res,next) =>{
    const token = req.header('auth-token')
    if(!token){
        res.status(400).json({msg:"token not found"})
    }
    try {
        const verified = jwt.verify(token,process.env.SECRET_KEY)
        req.user = verified.user
        next()
    } catch (error) {
        res.status(500).send('server error at middleware')
    }
}

module.exports = auth