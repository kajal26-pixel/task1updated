const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    _id:{type:String,required:true},
    name:{type:String,required:true},
    email:{type:String},
    password:{type:String,required:true},
    Dob:{type:String,required:true},
    ReferredBy:{type:String,default:'0'},
    otp:{type:Number,maxlength:4}
},{timestamps:true})



module.exports= mongoose.model('User',userSchema)