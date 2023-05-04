const express=require('express')
const Joi=require('joi')

module.exports=(user)=>
{
   const schema=Joi.object({
    _id:Joi.string().required(),
    name:Joi.string().required(),
    email:Joi.string(),
    password:Joi.string().required(),
    Dob:Joi.string().required(),
    ReferredBy:Joi.string()
   })
   return schema.validate(user)
}