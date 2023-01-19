import mongoose from "mongoose";
export const connectDB = (url:string) =>{
    return mongoose
        .connect(url)
        .then(()=>{
            console.log("CONNECTED TO DATABASE")
        })
        .catch((err)=>{
            console.log(err)
        })
}
