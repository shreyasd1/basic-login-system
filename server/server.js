const express = require('express')
const app = express()

const database = require('./config/db')
database()
app.use(express.json({extended:true}))

const PORT = process.env.PORT || 5000

app.use('/signup',require('./routes/authentication/register_route'))
app.use('/auth',require('./routes/authentication/authenticate_route'))
app.use('/crypt',require('./routes/encryption/encrypt_route'))

app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
})