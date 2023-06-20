const route=require('express').Router()
const routemodel=require('../models/user.model')
const jwt=require('jsonwebtoken')

const privatekey = "this key hdhfkflflfl"
verifytoken=(req,res,next)=>{
    let token=req.headers.authorization
    if(!token){
        res.status(400).json({msg:'access rejected ..!!'})
    }
    try{
      let verfi= jwt.verify(token,privatekey)
      next()
    }catch(e){
        res.status(400).json({ msg: e })
    }
}
route.get('/users',verifytoken,(req, res) => {
    let token = req.headers.authorization
    let user=jwt.decode(token,{complete:true})
    routemodel.getUsers().then((mssg) => res.json({users:mssg,user:user})).catch((err) => res.status(400).json(err))
})
route.post('/register',(req,res)=>{
    routemodel.register(req.body.nom,req.body.email,req.body.password)
    .then((user)=>res.status(200).json({user:user,mssg:"added"}))
    .catch((err)=>res.status(400).json({err:err}))
})

route.post('/login', (req, res) => {
    routemodel.login(req.body.email, req.body.password)
        .then((token) => res.status(200).json({ token: token }))
        .catch((err) => res.status(400).json({ err: err }))
})


module.exports=route