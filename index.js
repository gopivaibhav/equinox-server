require('dotenv').config()
const express= require('express');
const app=express();
const model=require('./model')
const mongoose=require('mongoose');
const env=require('dotenv').config()
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true,useUnifiedTopology: true }).then(res=>{
    console.log(`DB connected`)
})
const port=process.env.PORT || 5000
app.listen(port,()=>{console.log(`listening on ${port}`)});
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.get('/',(req,res)=>{
  res.send('Hello');
})
app.post('/',async(req,res)=>{
    const person=new model({
        name:req.body.name,
        email:req.body.email
    })
    person.save()
    .then(result=>{
        res.send("Saved succesfully!")
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
    
});