
const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

let SchemaUser =mongoose.Schema({
    nom:String,
    prenom:String,
    email:String,
    password:String,
    image:{uri:String}
})
var url = 'mongodb://localhost:27017/PremierProjet'
var User=mongoose.model('user',SchemaUser)

exports.register = (nom,prenom,email,password,image)=>{
  return new Promise ((resolve,reject)=>{
    mongoose.connect(url).then(()=>{
        return User.findOne({email:email})
        
    }).then((doc)=>{
        if(doc){
            mongoose.disconnect()
            resolve('Cet email existe déja')
        }else{
           bcrypt.hash(password,10).then((hashPass)=>{
            let user = new User ({
                nom:nom,
                prenom:prenom,
                email:email,
                password:hashPass,
                image:image
            })
            user.save().then((user)=>{
                mongoose.disconnect()
                resolve(user)
            }).catch((err)=>{
                mongoose.disconnect()
                reject(err)
            })
           }).catch((err)=>reject(err))
        }
    })
  })
}
const privatekey="this key hdhfkflflfl"
exports.login=(email,password)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            return User.findOne({email:email})
        }).then((user)=>{
            if(!user){
                mongoose.disconnect()
                const mssg = "Mot de passe ou email invalide"
                resolve(mssg)
            }else{
                bcrypt.compare(password,user.password).then((same)=>{
                    if(same){
                    //ykhazynly data mou3ayna ,token nestha9ouh cote sécurite bch net2kdou mn user msajill aandy 
                    let token=jwt.sign({id:user._id},privatekey,{
                        expiresIn:'5h'
                    })
                    mongoose.disconnect()
                    resolve({token,user})

                    }
                    else{
                        mongoose.disconnect()
                        const mssg = "Mot de passe ou email invalide"
                        resolve(mssg)
                    }
                }).catch((err)=>{
                    mongoose.disconnect()
                    reject(err)})
            }
        })
    })
}

exports.getUsers = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            return User.find()
        }).then((doc) => {
            mongoose.disconnect()
            resolve(doc)
        }).catch((err) => {
            mongoose.disconnect()
            reject(err)
        })

    })
}
exports.getUsersById = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            return User.findById(id)
        }).then((doc) => {
            mongoose.disconnect()
            resolve(doc)
        }).catch((err) => {
            mongoose.disconnect()
            reject(err)
        })

    })
}

exports.updateUser = (id,nom,prenom,email,image) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            return User.updateOne({ _id: id }, {nom:nom,prenom:prenom,email:email,image:image})
        }).then((doc) => {
            mongoose.disconnect()
            resolve(doc)
        }).catch((err) => {
            mongoose.disconnect()
            reject(err)
        })

    })
}