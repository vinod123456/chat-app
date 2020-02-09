const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//creating user schema in mongodb

const userSchema=new Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

module.exports=User=mongoose.model('User',userSchema);
