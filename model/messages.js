const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//creating message schema in mongodb

const messagesSchema=new Schema({
    message:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true,
        default:Date.now
    },
    userName:{
        type:String,
        required:true
    }
})

module.exports=MessageData=mongoose.model('MessageData',messagesSchema);
