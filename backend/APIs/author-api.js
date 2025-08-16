
const exp=require('express')
const authorApp=exp.Router()
const {createUserOrAuthor,userOrAuthorLogin}=require('./Util')
const expressAsyncHandler=require('express-async-handler');
const verifyToken = require('../Middlewares/VerifyToken');





let authorsCollection;
let articlesCollection;
authorApp.use((req,res,next)=>{
    authorsCollection=req.app.get('authorsCollection')
    articlesCollection=req.app.get('articlesCollection')
    next()
})

//define routes
authorApp.post('/register',expressAsyncHandler(createUserOrAuthor) )
//author login
authorApp.post('/login',expressAsyncHandler(userOrAuthorLogin) )

//to save new article
authorApp.post('/add-article',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get new article from client
    const newArticle=req.body;
    //save new Article to articles collection
    await articlesCollection.insertOne(newArticle)
    //send res
    res.send({message:"New article added"})
}))












//read artcles by author's username
authorApp.get('/author-profile/author-articles/:username',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get author's username from url
    const usernameOfAuthor=req.params.username;
    
    //get articles of current author
    const articlesList=await articlesCollection.find({username:usernameOfAuthor}).toArray()
    //send res
    
    res.send({message:"Articles",payload:articlesList})
}))




//edit article
authorApp.put('/article',verifyToken,expressAsyncHandler(async(req,res)=>{

        //get modified article
        const modifiedArticle=req.body;
         let articleAfterModification=await articlesCollection.findOneAndUpdate({articleId:(+modifiedArticle.articleId)},{$set:{...modifiedArticle}},{returnDocument:'after'})
         res.send({message:"Article modified",payload:articleAfterModification})

}))

//delete article(soft delete)
authorApp.put('/article/:articleId',verifyToken,expressAsyncHandler(async(req,res)=>{
    let articleIdOfUrl=Number(req.params.articleId)
    let article=req.body.copy;
    if(article.status===true){
    let result=await articlesCollection.updateOne({articleId:articleIdOfUrl},{$set:{status:false}})
    if(result.modifiedCount===1){
        res.send({message:"article deleted"})
    }
    }
    if(article.status===false){
        let result=await articlesCollection.updateOne({articleId:articleIdOfUrl},{$set:{status:true}})
        if(result.modifiedCount===1){
            res.send({message:"article restored"})
        }
        }
}))


// getting all users to admin

authorApp.get('/author-details',verifyToken,expressAsyncHandler(async(req,res)=>{
    let authors=await authorsCollection.find().toArray();
    res.send({message:"All Authors",payload:authors})

    
    
}))


// block and activating author

authorApp.put('/:username',verifyToken,expressAsyncHandler(async(req,res)=>{
    let usernameParams=req.params.username;
    let user=req.body.authorObj;
    if(user.status===true){
    let result=await authorsCollection.updateOne({username:usernameParams},{$set:{status:false}})
    if(result.modifiedCount===1){
        res.send({message:"Author Blocked",payload:result})
    }
    }   
    if(user.status===false){
    let result=await authorsCollection.updateOne({username:usernameParams},{$set:{status:true}},{returnDocument:'after'})
    if(result.modifiedCount===1){
        res.send({message:"Author Activated",payload:result})
    }
}
}))
authorApp.get('/all-articles',expressAsyncHandler(async(req,res)=>{
    const articlesList= await articlesCollection.find({status:true}).toArray();
    
    res.send({message:"all articles",payload:articlesList})
}))




authorApp.get('/author-articles/:username',expressAsyncHandler(async(req,res)=>{
    //get author's username from url
    const usernameOfAuthor=req.params.username;
    
    //get articles of current author
    const articlesList=await articlesCollection.find({username:usernameOfAuthor}).toArray()
    //send res
    
    res.send({message:"Articles",payload:articlesList})
}))

//export userApp
module.exports=authorApp;