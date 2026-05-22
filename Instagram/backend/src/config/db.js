require("dotenv").config()

const { default: mongoose } = require("mongoose");

  
  const connectDb = ()=>{
    try {
        let res = mongoose.connect(process.env.MONGODB_URI)
if(res){
    console.log("Db is connected")
}        
    } catch (error) {
        console.log(`error in connect db ${error}`)
    }
  }

  module.exports =connectDb