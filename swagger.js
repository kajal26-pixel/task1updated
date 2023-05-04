const Model=require('./models/user')
const swaggerAuto=require('swagger-autogen')()

const output='./swagger_output.json'
const input=['./routes/signup','./routes/login','./routes/forgot','./routes/heirarchy']

const doc={
    definitions:{
        "AddUser":{
            "_id":"D234D",
            "name":"rehya",
            "email":"reh@gmail.com",
            "password":"78903",
            "Dob":"02/20/2000",
            "ReferredBy":"B234B"

        }

    }
}
        
swaggerAuto(output,input,doc).then(()=>{
    require('./index')
})