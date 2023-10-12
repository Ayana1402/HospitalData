const express = require('express')
const morgan = require('morgan')
const app = new express()
app.use(morgan('dev'))
require('dotenv').config()
const routerFile = require('./routes/basics')
app.use('/api',routerFile)
// app.use(express.static('/public'))






//const PORT = process.env.PORT

app.listen(3002,()=>{
    console.log(`app is listening in PORT ${PORT}`)

})