import express,{ Express } from "express";
import dotenv from "dotenv"
import router from "./routes/products";
import { connectDB } from "./db/connect";
import { notFound } from "./middlewares/notFound";
import "express-async-error"
import { errorHandlerMiddleware } from "./middlewares/error-handler";

dotenv.config()
const app:Express = express();
const port = process.env.PORT
const url = process.env.URL

app.use(express.json())
app.use("/api/v1/products/",router)
app.use(notFound)
app.use(errorHandlerMiddleware)


const start = async() => {
    try{
        await connectDB(url!)
        app.listen(port,()=>{
            console.log(`Server is running on port ${port} ⚡⚡`)
        })
    } catch(err){
        console.log(err)
    }
}

start();