const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017";


const connectTomongo = () =>{
    mongoose.connect(mongoURI).then(()=>console.log("Connected to mogno successfully")).catch((e)=>console.log(e.message))
}

module.exports= connectTomongo 