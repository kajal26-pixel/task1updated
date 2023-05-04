const express=require('express')
const Joi=require('joi')

module.exports=(user)=>
{
   const schema=Joi.object({
    email:Joi.string(),
    password:Joi.string().required(),
    ReferredBy:Joi.number()
   })
   return schema.validate(user)
}