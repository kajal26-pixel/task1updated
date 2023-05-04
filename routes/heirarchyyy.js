const heirarchy=require('js-hierarchy')
const express=require('express')
const router= express.Router()
const Model=require('../models/user')
const Bluebird=require('bluebird')
const _=require('lodash')

router.get('/tree',async()=>{
    var ab=await Model.findOne({_id:'A123A'})
    console.log(ab)
    var rootNode=new heirarchy.SimpleNode('Abba')
    rootNode.setData('testkey', ab)
    console.log(rootNode.getData('testkey'))

    var cd=await Model.findOne({_id:'B123A'})
    var de=await Model.findOne({_id:'B121A'})
    //rootNode.addChild(new SimpleNode(cd))

    var childNode = new heirarchy.SimpleNode('Beta', {'testkey': cd});
    var child2=new heirarchy.SimpleNode('Beti', {'testkey': de});
    childNode.addChild(new heirarchy.SimpleNode('Potaofbeta', {'testkey': 'grandChildofbeta'}));
    childNode.addChild(new heirarchy.SimpleNode('Potaofbeta2.0', {'testkey': 'grandChildofbeta2.0'}));
    child2.addChild(new heirarchy.SimpleNode('Potaofbeti', {'testkey': 'grandChildofbeti'}));
    rootNode.addChild(childNode);
    rootNode.addChild(child2);
    let res=child2.getParent()
    console.log(res._data.testkey._id)

    // rootNode.walk(heirarchy.Direction.up, (node) => {
    //     console.log(node.getData('testkey'));
    //     return Bluebird.resolve();

    // });

    // console.log(child2.getParent)

    // childNode = new SimpleNode('Beta', {'testkey': 'childvalue'})

    // var cd=Model.findOne({_id:'B123A'})
    // rootNode.addChild(new SimpleNode(cd))
    // console.log(rootNode.getData('mykey'))
})

router.get('/level',async(req,res)=>{
    var res=await Model.find({}).select('ReferredBy')

    //console.log(_.pick(res,['ReferredBy']))
    console.log(res)
    var res2=await Model.find({}).select('ReferredBy -_id')
    
    var res3=await Model.find({ReferredBy:'0'})
    console.log(res3[1])
})

router.get('/levels/:id',async(req,res)=>{
    //var res3=await Model.find({ReferredBy:'0'})
    // if(res3){
    //     for(var i=0;i<res3.length;i++){
    //         let ab=res3[i].name
    //         ab=new heirarchy.SimpleNode(res3[i].name)
    //         ab.setData('testkey', res3[i])
    //     }
    // }
    // else{
        
    // }
    var res3=await Model.find({ReferredBy:'0'})
    if(res3){
        for(var i=0;i<res3.length;i++){
            let ab=res3[i].name
            ab=new heirarchy.SimpleNode(res3[i].name)
            ab.setData('testkey', res3[i])
        }
    }
    var all=await Model.find()
    console.log(all)
    for(let i=0;i<all.length;i++){
        console.log(all[i])
        console.log(all[i].ReferredBy)
        
        if (all[i].ReferredBy!=0){
            console.log('not zeeerooo')
            let ab=await Model.find({_id:all[i].ReferredBy})
            console.log(ab)
            ab.addChild(new heirarchy.SimpleNode(all[i].name, {'testkey': all[i]}))
            // let ab=all[i].name
            // ab=new heirarchy.SimpleNode(all[i].name)
            // ab.setData('testkey', all[i])
        }
        else{
            console.log('hainn')
            
        }
    }
    var rootNode=await Model.findById({_id:req.params.id})
    rootNode.walk(heirarchy.Direction.up, (node) => {
        var result=node.getData('testkey')
        console.log(result);
        return Bluebird.resolve();
    });
    res.send(result)
    
})
module.exports=router