const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')

const {check, validationResult }= require('express-validator')
router.get('/',auth, async (req,res)=>{
    try {
        const user = await User.findById(req.user.id)
        res.json({user})
    } catch (error) {
        console.log({error})
        res.status(500).json({msg:error})
    }
})
router.post('/',
check('email','please enter valid email').isEmail(),
check('password','please provide password').exists()
,async(req,res)=>{
   try {
       const valError = validationResult(req)
       if(!valError.isEmpty()){
            res.status(400).json({error:valError.array()})
       }
       else{
           const {email, password} = req.body
            try {
                let user = await User.findOne({email})
                if(!user){
                    res.status(400).send("user not registered")
                }else{
                    const match = await bcrypt.compare(password, user.password)
                    if(!match){
                        res.status(400).send("incorrect password")
                    }
                   else{
                    const payload = {
                        user:{
                            id:user.id
                        }
                    }
                    jwt.sign(payload,process.env.SECRET_KEY,{
                        expiresIn:3600
                    },(error,token)=>{
                        if(error){
                            return res.status(400).send("server error")
                        }else{
                            res.send({token})
                        }
                    })
                   }

                }
            } catch (error) {
                console.error(error)
            }
       }
   } catch (error) {
        console.log(error)
        res.status(503).json({error})  
   }
})

module.exports = router
