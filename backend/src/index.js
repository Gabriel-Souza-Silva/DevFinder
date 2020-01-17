const express = require('express')
const axios = require('axios')
const mongoose = require('mongoose')
const routes = require('./routes')
const cors = require('cors')

const app = express()

mongoose.connect('mongodb+srv://devmaster:Oimeuchapa2@cluster0-f5gl2.mongodb.net/devFinderDatabase?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex: true,
})


app.use(cors())
app.use(express.json())
app.use(routes)


app.listen(3333)