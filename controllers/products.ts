import { Application, Request, Response, NextFunction } from 'express';
import mongoose from "mongoose"
import Products from '../models/Products';
import Task from "../models/Task"

type queryObjectT = {
    name?:{
        $regex:string;
        $options:string
    };
    featured?:boolean;
    company?:string;
    sort?:string;
    fields?:string;
    numericFilters?:string
}

export const getAllProductsStatic = async(req:Request,res:Response) => {
    const search = req.query.name

    const products = await Products
    .find({price:{$gt:30}})
    .sort("name")
    .select("name price")
    .limit(10)
    .skip(5)
    res.status(200).json({products,nbHits:products.length})
    // res.status(200).json({"Success":true});
}

export const getAllProducts = async(req:Request,res:Response) => {
    const {name,featured,company,sort,fields,numericFilters} = req.query
    const queryObject:queryObjectT = {}

    if (featured){
        queryObject.featured = featured === "true" ? true : false
    }
    if (company){
        queryObject.company = String(company)
    }
    if (name){
        queryObject.name = {$regex:String(name),$options:"i"}
    }
    let result = Products.find(queryObject)

    if(sort){
        const sortList = String(sort).split(",").join(" ")
        result = result.sort(sortList)
    }
    else{
        result= result.sort("createdAt")
    }

    if(fields){
        const fieldsList = String(fields).split(",").join(" ")
        result = result.select(fieldsList)
    }
    if(numericFilters){
        type gtT = string
        type gteT = string
        type eqT = string
        type ltT = string
        type lteT = string

        type operatorMapT = {
            ">":gtT,
            ">=":gteT,
            "=":eqT,
            "<":ltT,
            "<=":lteT,
        }
        const operatorMap:operatorMapT = {
            ">":"$gt",
            ">=":"$gte",
            "=":"$eq",
            "<":"$lt",
            "<=":"$lte",
        }
        console.log(operatorMap[">"])
        const regEx:RegExp = /\b(<|>|>=|<=|=)\b/g
        let filters:string = String(numericFilters).replace(
            regEx,
            // @ts-ignore 
            (match)=>`-${operatorMap[(match)]}-`
        );
        console.log(filters);
        const options:string[] = ["price","rating"]
        // @ts-ignore
        filters = filters.split(",").forEach((item)=>{
            const [field,operator,value] = item.split("-");
            if(options.includes(field)){
                // @ts-ignore
                queryObject[field]={[operator]:Number(value)}
            }
        })
        console.log(queryObject);
        
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page-1) * limit

    result = result.skip(skip).limit(limit)
    // 23
    // 4 (7 7 7 2)

    const products = await result
    res.status(200).json({products,nbHits:products.length})
}
