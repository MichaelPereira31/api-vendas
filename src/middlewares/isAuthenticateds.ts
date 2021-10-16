import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import AppError from "../errors/AppError";
import authConfig from "../../src/config/auth"

export default function isAuthenticated(request:Request, response:Response, next:NextFunction):void{
    const authHeader = request.headers.authorization;

    if (!authHeader){
        throw new AppError('JWT Token in missing.')
    }

    const [type,token] = authHeader.split(' ');

    try{
        const decodeToken = verify(token,authConfig.jwt.secret)
        return next()
    } catch {
        throw new AppError('Invalid JWT Token');
    }
    
}