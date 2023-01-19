import dotenv from "dotenv"
dotenv.config()
import { connectDB } from "./db/connect"
import Products from "./models/Products"
import jsonProducts from "./products.json" 

const url = process.env.URL

const start = async() => {
    try{
        await connectDB(url!)
        await Products.deleteMany({})
        await Products.create(jsonProducts)
        console.log("Success");
        process.exit(0)
    } catch(error){
        console.log(error)
        process.exit(1)
    }
}

start()