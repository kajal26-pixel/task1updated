const express=require('express')
const app=express()
require('dotenv').config()
const signRoute=require('./routes/signup')
const loginRoute=require('./routes/login')
const forgotp=require('./routes/forgot')
const tree=require('./routes/heirarchy')
const mongoose=require('mongoose')
const swaggerUi=require('swagger-ui-express')
const swaggerOutput=require('./swagger_output.json')

app.use('/',signRoute)
app.use('/',loginRoute)
app.use('/',forgotp)
app.use('/',tree)
app.use(express.json())
app.use('/doc',swaggerUi.serve,swaggerUi.setup(swaggerOutput))

mongoose.connect(process.env.DB)
.then(console.log('mongodb connected'))
.catch(err=>console.log(err))


const port= process.env.PORT || 3000;  
app.listen(port,()=>{console.log('loading on port '+port+'...')})