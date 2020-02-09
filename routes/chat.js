const express=require('express');
const jwt=require('jsonwebtoken');
const router=express.Router();

const Message=require('../model/messages');

//api endpoint to save new message to db

router.post('/message',(req,res)=>{
    const {token,message}=req.body;
    let userName=''
    
    //verify token 
    jwt.verify(token,'secretkey',(err,decoded)=>{
        if(err){
            console.log(err);
        }
        userName=decoded.userName;
    })
    const newMessage=new Message({
        message:message,
        userName:userName
    })
    newMessage.save()
        .then(response=>{
            res.json(response);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json(err);
        })
})

//endpoint to handle get request for messages

router.get('/messages',(req,res)=>{
    Message.find()
     .then(data=>{
         res.json(data);
     })
     .catch(err=>{
         console.log(err)
         res.status(500).json(err);
     })
})

module.exports=router;
