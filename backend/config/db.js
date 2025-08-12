const mongoose=require('mongoose')
require('dotenv').config();



exports.connect=()=>{
    mongoose.connect("mongodb://localhost:27017/whatsapp",{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(()=>{
        console.log("Database connected successfully");
    }).catch((error)=>{
        console.log("Database connection failed");
        console.error(error);
    });
}   