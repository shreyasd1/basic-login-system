const express = require('express')
const { route } = require('../authentication/authenticate_route')
const router = express.Router()
var CryptoJS = require("crypto-js");

router.post('/',async(req,res)=>{
    try {
        var ciphertext = CryptoJS.AES.encrypt(req.body.plaintext,process.env.SECRET_KEY).toString();
        res.json(ciphertext)
    } catch (error) {
        console.log("error")
    }
})

module.exports = router