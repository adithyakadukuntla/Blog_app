const exp=require('express')
const app=exp();
const path=require('path');
const dotenv=require("dotenv").config()
const mongoClient=require('mongodb').MongoClient;
app.use(exp.json())


app.use(exp.static(path.join(__dirname,'../frontend/build')))

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
//   });


//connect to db server
mongoClient.connect(process.env.DB_URL)
.then(client=>{
    const blogdbObj=client.db('blogapp')
    const usersCollection=blogdbObj.collection('users')
    const authorsCollection=blogdbObj.collection('authors')
    const articlesCollection=blogdbObj.collection('articles')
    const adminCollection=blogdbObj.collection('admin');
    //share collections obj with apis

    app.set('usersCollection',usersCollection)
    app.set('authorsCollection',authorsCollection)
    app.set('articlesCollection',articlesCollection)
    app.set('adminCollection',adminCollection)
    console.log("DB connection success")

})
.catch(err=>{
    console.log('Err in connect DB ',err)
})


//impoort apis

const  userApp=require('../backend/APIs/user-api')
const adminApp=require('../backend/APIs/admin-api')
const authorApp=require('../backend/APIs/author-api');


//handle req and pass to respective starting route

app.use('/user-api',userApp)
app.use('/admin-api',adminApp)
app.use('/author-api',authorApp)




//error handling middleware
app.use((err,req,res,next)=>{
res.send({status:'error',message:err.message})
})

const port=process.env.PORT || 4000
app.listen(port,()=>{console.log(`HTTP server on ${port}`)})

