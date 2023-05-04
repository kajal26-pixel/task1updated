const express=require('express')
const router=express.Router()
const validate=require('../controllers/index')
const Model=require('../models/user')
const _=require('lodash')
const bcrypt=require('bcrypt')
const heirarchy=require('js-hierarchy')

router.use(express.json())

router.post('/signup',async(req,res)=>{
    try{

        /* #swagger.parameters['newUser'] = {
               in: 'body',
               description: 'REGISTER',
               schema: { $ref: "#/definitions/AddUser" }
        } */
        console.log(req.body)
        let result=validate.signup(req.body)
        if(result.error)
        return res.status(400).send(result.error.details[0].message)

        let user=await Model.findOne({email:req.body.email})
        if(user) 
        return res.status(400).send('user already registered') 

        //console.log('yayyyy')
        //console.log(req.body.Dob)
        let ab=new Date(req.body.Dob)
        //console.log(ab)
        
        var users=new Model(_.pick(req.body,['_id','name','email','password','Dob','ReferredBy']))
        //console.log('okay')
        let salt=await bcrypt.genSalt(10)
        users.password=await bcrypt.hash(users.password,salt)
        users.Dob=ab

        await users.save()


        res.send(_.pick(users,['_id','name','email','Dob','ReferredBy']))
    }
    catch(err){
        res.send(err)
    }

})
module.exports=router