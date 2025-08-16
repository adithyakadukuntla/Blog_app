const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const expAsyncHand=require('express-async-handler')

require('dotenv').config();
// It is used for writing same handlers here so code reusability

const createUserOrAuthor= expAsyncHand(async(req,res)=>{
    //get users and authors or users collection object 
    const userCollectionObj=req.app.get('usersCollection')
    const authorCollectionObj=req.app.get('authorsCollection')
    
    //get user or author
    const user = req.body
  
  

    if(user.userType=="user"){

        let dbUser=await userCollectionObj.findOne({username:user.username})
        if(dbUser!=null){
           return  res.send({message:'Username already exists use another'})
        }
    }
    if(user.userType=='author'){
        let dbUser=await authorCollectionObj.findOne({username:user.username})
        if(dbUser!=null){
          return   res.send({message:'Authorname already exists use another'})
        }
    }
    //hash the password 
    const hashedPassword=await bcryptjs.hash(user.password,7)
    //replace password
    user.password=hashedPassword;


    //save user
    if(user.userType=='user'){
        await userCollectionObj.insertOne(user)
        res.send({message:'User Created'})
    }
    if(user.userType=='author'){
        await authorCollectionObj.insertOne(user)
        res.send({message:'Author Created'})
    }
})


const userOrAuthorLogin=expAsyncHand(async(req,res)=>{

    const userCollectionObj=req.app.get('usersCollection')
    const authorCollectionObj=req.app.get('authorsCollection')
    
    const userCred=req.body;
    

    if(userCred.userType=='user'){
        //console.log("userCred.status",userCred.status)

        
        let dbuser=await userCollectionObj.findOne({username:userCred.username})
       // console.log("dbuser",dbuser)
        if(dbuser==null){
            return res.send({message:"Invalid username"})
        }
        if(dbuser.status===false){
            return res.send({message:'You are Blocked please go to help?'})
        }else{
            let status= await bcryptjs.compare(userCred.password,dbuser.password)
            if(status==false){
                return res.send({message:"Invalid password"})
            }else{
                const signedToken=jwt.sign({username:dbuser.username},process.env.SECRET_KEY,{expiresIn:'7d'})
                delete dbuser.password;
                res.send({message:'login successfull',token:signedToken,user:dbuser})
            }
        }
        
    }  
    if(userCred.userType=='author'){
        let dbuser=await authorCollectionObj.findOne({username:userCred.username})
        if(dbuser==null){
            return res.send({message:"Invalid username"})
        }
        if(dbuser.status===false){
            return res.send({message:'You are Blocked please go to help?'})
        }else{
            let status= await bcryptjs.compare(userCred.password,dbuser.password)
            if(status==false){
                return res.send({message:"Invalid password"})
            }else{
                const signedToken=jwt.sign({username:dbuser.username},process.env.SECRET_KEY,{expiresIn:'7d'})
                delete dbuser.password;
                res.send({message:'login successfull',token:signedToken,user:dbuser})
            }
        }
    
    }  

})

module.exports={createUserOrAuthor,userOrAuthorLogin};