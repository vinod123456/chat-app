const express=require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose=require('mongoose');
const path = require("path");
require('dotenv').config();

const users=require('./routes/users');
const chat=require('./routes/chat');

const user=process.env.MONGO_USER;
const password=process.env.MONGO_PASS;

const uri=`mongodb://${user}:${password}@cluster0-shard-00-00-rww8m.mongodb.net:27017/test?authSource=admin&w=majority&ssl=true`

const app=express();
app.use(cors());

mongoose.connect(uri,{ useNewUrlParser: true })
.then(success=>console.log('MongoDB conneced....'))
.catch(err=>console.log(err))



// MongoClient.connect(uri,{ useNewUrlParser: true },(err,client) => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   console.log(collection);
//   client.close();
//   if(err){console.log('MONGO CONNECTION ERROR',err)}
// });



app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, "client", "build")))
// app.use('/',(req,res)=>{
//     res.json('helloo');
// })



app.use('/user',users);
app.use('/chat',chat);






app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server running on port ${port}`));