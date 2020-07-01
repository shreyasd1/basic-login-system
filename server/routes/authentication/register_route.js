const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {check, validationResult }= require('express-validator')

router.post('/',
check('name','please enter name').not().isEmpty(),
check('email','please enter valid email').isEmail(),
check('password','password should be atleast 6 character long').isLength({min:6})
,async(req,res)=>{
   try {
       const valError = validationResult(req)
       if(!valError.isEmpty()){
            res.status(400).json({error:valError.array()})
       }
       else{
           const {name, email, password} = req.body
            try {
                let user = await User.findOne({email})
                if(user){
                    res.status(400).send("user already exists")
                }else{
                    user = new User({
                        name, email, password
                    })
                    const salt = await bcrypt.genSalt(10)
                    user.password =  await bcrypt.hash(password,salt)
                    await user.save()

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
