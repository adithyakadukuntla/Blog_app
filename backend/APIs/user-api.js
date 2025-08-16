const exp=require('express')
const userApp=exp.Router()
const expressAsyncHandler=require('express-async-handler')
const {createUserOrAuthor,userOrAuthorLogin}=require('./Util')
const verifyToken = require('../Middlewares/VerifyToken');

let usersCollection;
let articlesCollection;
userApp.use((req,res,next)=>{
     usersCollection=req.app.get('usersCollection')
     articlesCollection=req.app.get('articlesCollection')
    next();
})

//user register

userApp.post('/register',expressAsyncHandler(createUserOrAuthor));
//user login
userApp.post('/login',expressAsyncHandler(userOrAuthorLogin));

// getting author articles   
userApp.get('/articles',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get all articles of all authors
    const articlesList=await articlesCollection.find({status:true}).toArray()
    res.send({message:"All articles",payload:articlesList})
}))


/// comments posting by user into authors article

userApp.post('/comment/:articleId',expressAsyncHandler(async(req,res)=>{
    //get the article ids from params
    const articleId=(+req.params.articleId);
    // get comment obj from req
    const userComment=req.body;
    // get article document
    //modify docu by pushing element into comments array
    //updatee the document... instead of doing all these 
    //mongodb contains a method called """ $push """" operator and another $addToSet
   //3 steps are not required/.......
   ///
   //addd useername obj as an element to comments array of article dox
   await articlesCollection.updateOne({articleId:articleId},{$addToSet:{comments:userComment}});
   res.send({message:"comment posted"})


}))

userApp.get('/user-details',verifyToken,expressAsyncHandler(async(req,res)=>{
    let authors=await usersCollection.find().toArray();
    res.send({message:"All Users",payload:authors})
    
}))
// block and activating user

userApp.put('/:username',verifyToken,expressAsyncHandler(async(req,res)=>{
    let usernameParams=req.params.username;
    let user=req.body.userObj;
    if(user.status===true){
    let result=await usersCollection.updateOne({username:usernameParams},{$set:{status:false}})
    if(result.modifiedCount===1){
        res.send({message:"User Blocked",payload:result})
    }
    }   
    if(user.status===false){
    let result=await usersCollection.updateOne({username:usernameParams},{$set:{status:true}},{returnDocument:'after'})
    if(result.modifiedCount===1){
        res.send({message:"User Activated",payload:result})
    }
}
}))


module.exports=userApp;