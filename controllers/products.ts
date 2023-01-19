import { Application, Request, Response, NextFunction } from 'express';
import mongoose from "mongoose"
import Products from '../models/Products';
import Task from "../models/Task"

type queryObjectT = {
    name?:string;
    featured?:boolean;
    company?:string;
}

export const getAllProductsStatic = async(req:Request,res:Response) => {
    const products = await Products.find({name:"vase table",})
    res.status(200).json({products,nbHits:products.length})
    // res.status(200).json({"Success":true});
}

export const getAllProducts = async(req:Request,res:Response) => {
    const {name,featured,company} = req.query
    console.log(typeof name)
    console.log(typeof company)
    const queryObject:queryObjectT = {}

    if (featured){
        queryObject.featured = featured === "true" ? true : false
    }
    if (company){
        queryObject.company = company
    }
    if (name){
        queryObject.name = name
    }
    const products = await Products.find(queryObject)

    res.status(200).json({products,nbHits:products.length})
}
