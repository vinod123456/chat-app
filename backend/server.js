const express=require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose=require('mongoose');
const MongoClient = require('mongodb').MongoClient;


const uri="mongodb://db-vinod:1234@cluster0-shard-00-01-rww8m.mongodb.net:27017/test?authSource=admin&w=majority&ssl=true"

const app=express();
app.use(cors());

MongoClient.connect(uri,{ useNewUrlParser: true },(err,client) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  console.log(collection);
  client.close();
  if(err){console.log('MONGO CONNECTION ERROR',err)}
});






app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

console.log('successfull');






const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server running on port ${port}`));