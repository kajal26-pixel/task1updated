const express=require('express')
const router=express.Router()
const validate=require('../controllers/index')
const Model=require('../models/user')
const _=require('lodash')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

router.use(express.json())

router.post('/login',async(req,res)=>{
    try{
        /* #swagger.parameters['login'] = {
               in: 'body',
               description: 'LOG IN',
        }  */
        let result=validate.login(req.body)
        if(!result) return res.status(400).send(result.error.details[0].message)

        let user=await Model.findOne({email:req.body.email})
        if(!user) return res.send('user not registered with us')

        let pass=await bcrypt.compare(req.body.password,user.password)
        if(!pass) return res.send('invalid password')
        
        let token=jwt.sign({_id:user._id},process.env.JWTSECRET)
        if(pass){
            req.body.password=user.password
            res.json({
                name:user.name,
                email:user.email,
                password:user.password,
                Dob:user.Dob,
                RefferedBy:user.ReferredBy,
                token:token
            })

        }

    }
    catch(err){
        res.send(err)
    }
})
module.exports=router