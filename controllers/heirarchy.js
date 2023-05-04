
const Model=require('../models/user')

const getAllDown=async(result,overall)=>{
    // var overall=[]
    // var user=req.params.id;
    console.log(result)
    console.log(overall)
    
    
    overall.push(result)
    console.log(overall)
    console.log('yes')
    var j=0
    var i = 0
    while(i<result.length){
        //console.log(result[i])
        //console.log(res)
        user=result[i]._id
        console.log(user)
        var result=await Model.find({ReferredBy:user})
        console.log(result)
        overall.push(result)
        await getAllDown()
        i++
            
        
        
    }
    return overall
    
}

const getLevel=async(id,level1,callback)=>{
    var children2=[]
    var children1=[]
    var children3=[]
    var children4=[]
    var children5=[]
    console.log(level1)
    var level1=level1
    console.log(level1.length)
    
    for(let i=0;i<level1.length;i++){
        console.log(id)
        console.log(level1[i]._id)
        if (level1[i]._id==id){
            console.log(level1)
            children2=level1
            break;
        }
        else{
            var childrenof1=await Model.find({ReferredBy:level1[i]._id})
            console.log(childrenof1)
            children1=children1.concat(childrenof1)
            
            //overall.push(result2)
        }
        
    } 
    if(children2.length=0){
         console.log('not khali')
         console.log(children2)
         return (children2)
        // level1=children1
        // await getLevel(id,level1)
    }
    // console.log(children1)
    level1=children1
    // console.log(level1+"levelcheck")
    // for(let j=0;j<5;j++){
    await getLevel(id,level1)
    // }
    return (children2)
    
    
    

}

exports.getAllDown=getAllDown
exports.getLevel=getLevel
