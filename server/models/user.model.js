
const mongoose=require('mongoose')

let SchemaUser =mongoose.Schema({
    nom:String,
    prenom:String,
    email:String,
    password:String,
    image:{uri:String},
    verified:Boolean
}, {
    timestamps: true,
})
module.exports = mongoose.model('user', SchemaUser);