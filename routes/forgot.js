const express=require('express')
const router=express.Router()
const validate=require('../controllers/index')
const Model=require('../models/user')
const _=require('lodash')
const bcrypt=require('bcrypt')
require('dotenv').config()
const jwt=require('jsonwebtoken')

router.use(express.json())

router.post('/forgotpw',async(req,res)=>{
    try{
        /* #swagger.parameters['forgot'] = {
               in: 'body',
               description: 'FORGOT',
        }  */
        let result=await Model.findOne({email:req.body.email})
        if(!result) return res.status(400).send('invalid email')

        let gotp= await validate.forgot.genotp()
        console.log(gotp)
        let send= await validate.forgot.mail(req.body.email,gotp)
        result.otp=gotp
        console.log(result.otp)
        await result.save()
        var token=jwt.sign({_id:result._id},process.env.JWTSECRET)
        if (send) console.log('mail sent')
        res.json({
            token:token,
            otp:gotp,
            email:req.body.email
        })
    }
    catch(err){
        res.send(err)
        console.log(err)
    }
})

router.post('/forgotpw/verifyotp',async(req,res)=>{
    /* #swagger.parameters['otp'] = {
            in: 'body',
            description: 'OTP',
    }  */
    let result=jwt.verify(req.headers.authorization,process.env.JWTSECRET)
    
    req.userdata=result
    
    let ress=await Model.findOne({_id:req.userdata._id})
    console.log(ress.otp)
    let timediff=Math.floor((Date.now()-Date.parse(ress.updatedAt))/60000)
    console.log(timediff)
    if(timediff>1){
        return res.status(404).send('your otp has been expired')
    }
    else{
        let otp=String(req.body.otp)
        console.log(otp)
        if(ress.otp==otp) {
            console.log('you are allowed to change password')
            res.send('you are allowed to change password')
        }
        else{
            res.send('wrong otp')
        }
    }
})

router.post('/forgotpw/resetpw',async(req,res)=>{
    /* #swagger.parameters['reset'] = {
            in: 'body',
            description: 'RESET',
    }  */
    
    let token=req.headers.authorization
    let user=jwt.verify(token,process.env.JWTSECRET)
    //console.log(user)

    let users=await Model.findOne({_id:user._id})
    //console.log(users)
    //console.log(users.password)
    //console.log(req.body.password)
    let ab=req.body.password
    let salt=await bcrypt.genSalt(10)
    let cd=await bcrypt.hash(ab,salt)
    users.password=cd
    await users.save()
    res.send('password changed')
})


module.exports=router