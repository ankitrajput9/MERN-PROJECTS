import mongoose from "mongoose"

export const connectDB = async()=>{
try {
    
    const res = await mongoose.connect(process.env.MONGODB_URI)
if(res){
    console.log("Db is connected")
}

} catch (error) {
console.log("error in Connection DB",error)    
}

}