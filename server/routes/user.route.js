const route=require('express').Router()
const routemodel=require('../controllers/user')
const jwt=require('jsonwebtoken')
 
/*const privatekey = "this key hdhfkflflfl"
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
}*/
route.get('/users',(req, res) => {
    let token = req.headers.authorization
    let user=jwt.decode(token,{complete:true})
    routemodel.getUsers().then((mssg) => res.json({users:mssg,user:user})).catch((err) => res.status(400).json(err))
})
route.get('/getById/:id', (req, res) => {
   
    routemodel.getUsersById(req.params.id).then((mssg) => res.json({ user: mssg})).catch((err) => res.status(400).json(err))
})
route.post('/register',(req,res)=>{
    routemodel.register(req.body.nom,req.body.prenom,req.body.email,req.body.password,req.body.image)
    .then((user)=>res.status(200).json({mssg:user}))
    .catch((err)=>res.status(400).json({err:err}))
})

route.post('/login', (req, res) => {
    routemodel.login(req.body.email, req.body.password)
        .then((token) => res.status(200).json({ token:token.token,user:token.user,mssg:token}))
        .catch((err) => res.status(400).json({ err: err }))
})
route.patch('/UpdateUser', (req, res) => {
    routemodel.updateUser(req.body.id, req.body.nom, req.body.prenom, req.body.image).then((mssg) => res.json(mssg)).catch((err) => res.status(400).json(err))
})
route.patch('/UpdatePassword', (req, res) => {
    routemodel.updatePassword(req.body.id,req.body.password).then((mssg) => res.json({mssg:mssg})).catch((err) => res.status(400).json(err))
})
route.get('/verify/:userId/:uniqueString', routemodel.verify);

route.get('/verified', routemodel.verified);
route.post('/ForgetPassword',(req,res)=>{
    routemodel.ForgetPassword(req.body.email).then((mssg)=>res.json(mssg)).catch((error)=>res.json(error))
})
route.post("/resetPassword",(req,res)=>{
    routemodel.ResetPassword(req.body.userId, req.bodyresetString, req.bodynewPassword).then((mssg) => res.json(mssg)).catch((error) => res.json(error))
})
module.exports=route