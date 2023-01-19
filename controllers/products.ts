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
}

export const getAllProductsStatic = async(req:Request,res:Response) => {
    const search = req.query.name

    const products = await Products.find({}).sort("name")
    res.status(200).json({products,nbHits:products.length})
    // res.status(200).json({"Success":true});
}

export const getAllProducts = async(req:Request,res:Response) => {
    const {name,featured,company,sort,fields} = req.query
    console.log(typeof name)
    console.log(typeof company)
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

    const products = await result



    res.status(200).json({products,nbHits:products.length})
}
