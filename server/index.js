const express=require('express')

const routeuser=require('./routes/user.route')
const app=express()
const cors=require('cors')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',routeuser)

app.use(cors());
app.listen(6000)