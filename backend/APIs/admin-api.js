const exp=require('express')
const adminApp=exp.Router()
const expressAsyncHandler=require('express-async-handler')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')

let usersCollection;
let authorsCollection;
adminApp.use((req,res,next)=>{
    usersCollection=req.app.get('usersCollection')
    authorsCollection=req.app.get('authorsCollection');
    adminCollection=req.app.get('adminCollection')
    next();
})


adminApp.post('/login',expressAsyncHandler(async(req,res)=>{
     const adminCred=req.body;
     //console.log(adminCred)
    // //hash the password 
    // const hashedPassword=await bcryptjs.hash(adminCred.password,7)
    // //replace password
    // adminCred.password=hashedPassword;
    // await adminCollection.insertOne(user)
    

    if(adminCred.userType==='admin'){
        let dbadmin= await adminCollection.findOne({username:adminCred.username})
        //console.log(dbadmin)
        if(dbadmin==null){
            return res.send({message:"No Admin Credentials"})
        }else{
            let admindb=await adminCollection.findOne({password:dbadmin.password})
            admindb.status=adminCred.status
              
            if(admindb.status===true)
                {
                    const signedToken=jwt.sign({username:admindb.username},process.env.SECRET_KEY,{expiresIn:'7d'})
                    delete dbadmin.password;
                    res.send({message:'login successfull',token:signedToken,user:dbadmin})
                
            }else{
            return res.send({message:"Inavalid password"})
            }
                
        }
    }
}))


module.exports=adminApp;