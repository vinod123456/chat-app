const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');

const User=require('../model/user')


router.post('/register',(req,res)=>{
    console.log(req.body);
    const newUser=new User({
        userName:req.body.userName,
        password:req.body.password
    });

    newUser.save()
        .then(user=>{console.log(user)
            res.json(user);
        })
        .catch(err=>{
            if(err.code==11000){
                console.log('vino..........')
                console.log(err.code);
                err.username='Username already taken';
                return res.status(400).send({message:'Username already taken'})
            }
            else{
                console.log('vinodddd...',err);
            }
        })
});

router.post('/login',(req,res)=>{
    let {userName,password}=req.body;

    User.findOne({userName})
        .then(user=>{
            console.log(user)
            if(!user){}
            const payload={id:user._id,userName:user.userName}
            if(password===user.password){
                jwt.sign(payload,process.env.SECRETKEY,(err,token)=>{
                    res.json(token);
                    console.log(token);
                    if(err){
                        console.log(err);
                    }
                })
            }else{
                return res.status(404).json({message:'Incorrect Password'});
            }
        })
        .catch(err=>{
            console.log(err);
            res.status(404).json({message:'User not Found'});
        })
})


module.exports=router;