import mongoose, { model, Schema } from "mongoose";

type nameT = {
    type:string;
    required:[boolean,string]
}
type priceT = {
    type:number;
    required:[boolean,string]
}
type featuredT = {
    type:boolean;
    default:boolean
}
type ratingT = {
    type:number;
    default:number
}

type companyT = {
    type:String;
    enum?:{
        values:[string],
        message:string
    };
    required:[boolean,string]
}

type createdAtT = {
    type:Date;
    default:Date;
}

type SchemaT = {
    name:nameT;
    price:priceT;
    featured:featuredT;
    rating:ratingT,
    company:companyT,
    createdAt:createdAtT
}

const productsSchema = new Schema<SchemaT>({
    name:{
        type : String,
        required:[true,"product name must be provided"]
    },
    price:{
        type : Number,
        required:[true,"product price must be provided"]
    },
    company:{
        type : String,
        enum:{
            values:["ikea","liddy","caressa","marcos"],
            message:"{VALUE} is not supported"
        },
        required:[true,"company name must be provided"]
    },
    featured:{
        type : Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:4.5
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

export default model("Products",productsSchema)