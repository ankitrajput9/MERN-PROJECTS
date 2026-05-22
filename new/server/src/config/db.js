import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        const res = await mongoose.connect("mongodb://0.0.0.0/neww")
        if(res){
            console.log("DB connect successfully")
        }
    } catch (error) {
        console.log("error in connect DB",error)
        
    }
}
