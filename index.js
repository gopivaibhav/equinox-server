require('dotenv').config()
const express= require('express');
const app=express();
const model=require('./model')
const mongoose=require('mongoose');
const session = require("express-session");
const env=require('dotenv').config()
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true,useUnifiedTopology: true }).then(res=>{
    console.log(`DB connected`)
})
app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.use(session({ secret: process.env.SESSION_SECRET, saveUninitialized: true, resave: true }));
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


const loginRoutes=require('./routes/login')
app.use('/',loginRoutes)

const port=process.env.PORT || 5000
app.listen(port,()=>{console.log(`listening on ${port}`)});