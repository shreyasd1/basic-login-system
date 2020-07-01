require ('dotenv').config()

const mongoose = require('mongoose')

const url = process.env.DATABASE_LINK

const startConnection = async () =>{
    try {
        await mongoose.connect(url,{useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:true} )
        console.log("successfully connected to mongoDB ")
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}
module.exports = startConnection