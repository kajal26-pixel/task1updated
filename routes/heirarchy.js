const express=require('express')
//const app = express()
const router=express.Router()
const validate=require('../controllers/index')
const Model=require('../models/user')

router.get('/down/:id',async(req,res)=>{
    var overall=[]
    var user=req.params.id;
    var result=await Model.find({ReferredBy:user})
    console.log(result)
    overall.push(result)
    var i = 0
    //console.log(result[i])
    while(i<result.length){
        //console.log(result[i])
        //console.log(res)
        user=result[i]._id
        console.log(user)
        var result2=await Model.find({ReferredBy:user})
        console.log(result2)
        overall.push(result2)
        var j=0
        while(j<result2.length){
            user=result2[j]._id
            console.log(user)
            var result3=await Model.find({ReferredBy:user})
            console.log(result3)
            overall.push(result3)
            var k=0
            while(k<result3.length){
                user=result3[k]._id
                console.log(user)
                var result4=await Model.find({ReferredBy:user})
                console.log(result4)
                overall.push(result4)
                k++
            }
            j++
        }
        i++
    }
    res.send(overall)
})


router.get('/level/:id',async(req,res)=>{
    var children2=[]
    var children1=[]
    var children3=[]
    var children4=[]
    var children5=[]
    let level1=await Model.find({ReferredBy:'0'})
    for(let i=0;i<level1.length;i++){
        if (level1[i]._id==req.params.id){
            res.send(level1)
        }
        else{
            var childrenof1=await Model.find({ReferredBy:level1[i]._id})
            console.log(childrenof1)
            children1=children1.concat(childrenof1)
            //overall.push(result2)
        }
    } 
    console.log(children1)
    for(let j=0;j<children1.length;j++){
        if (children1[j]._id==req.params.id){
            res.send(children1)
        }
        else{
            var childrenof2=await Model.find({ReferredBy:children1[j]._id})
            children2=children2.concat(childrenof2)
            //overall.push(result2)
        }
    }
    console.log(children2)
    for(let k=0;k<children2.length;k++){
        if (children2[k]._id==req.params.id){
            res.send(children2)
        }
        else{
            var childrenof3=await Model.find({ReferredBy:children2[k]._id})
            children3=children3.concat(childrenof3)
            //overall.push(result2)
        }
    }
    console.log(children3)
    for(let l=0;l<children3.length;l++){
        if (children3[l]._id==req.params.id){
            res.send(children3)
        }
        else{
            var childrenof4=await Model.find({ReferredBy:children3[l]._id})
            children4=children4.concat(childrenof4)
            //overall.push(result2)
        }
    }
    console.log(children4)
    for(let m=0;m<children4.length;m++){
        if (children4[m]._id==req.params.id){
            res.send(children4)
        }
        else{
            res.send('invalid id')
        }
    }

})

// router.get('/levelnew/:id',async(req,res)=>{
//     var id=req.params.id
//     var level1=await Model.find({ReferredBy:'0'})
//     console.log(level1)
//     var ab=await validate.heirarchy.getLevel(id,level1)

//     console.log(ab)
//     res.send(ab)
//     //console.log(await validate.heirarchy.getLevel(id,level1))
//     //res.send(await validate.heirarchy.getLevel(id,level1))
//     //console.log(ab)
//     //res.send(ab)
// })


// router.get('/newdown/:id',async(req,res)=>{
//     var id=req.params.id
//     var result=await Model.find({ReferredBy:id})
//     var ok=[]
//     var overall=[]
//     ok=await validate.heirarchy.getAllDown(result,overall)
//     console.log(ok)
//     res.send(ok)

// })



module.exports=router