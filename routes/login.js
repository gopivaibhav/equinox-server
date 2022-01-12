const router=require('express').Router()
const model=require('../model')
const session = require("express-session");

router.get('/',(req,res)=>{
    req.session.isAuth=false
    res.render('login');
  })
  router.post('/',async(req,res)=>{
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


router.post('/login',async(req,res)=>{
    if(req.body.email==="admin@iiitl.ac.in" && req.body.password===process.env.PASSWORD){
        console.log(req.session)
        req.session.isAuth=true
        try {
            const users=await model.find()
            res.redirect('/login')
        } catch (error) {
            res.status(400).send(error)
        }
    }else{
        res.status(400).send('Wrong Password')
    }
})
router.get('/login',async(req,res)=>{
    if(req.session.isAuth){
        try {
            const users=await model.find()
            res.render('list',{'users':users})
        } catch (error) {
            res.status(400).send(error)
        }
    }else{
        res.send('Login to see the data')
    }
})

module.exports=router