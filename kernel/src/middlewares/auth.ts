import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export const authentication = (req : Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) res.status(401).send({error: 'Unauthorized'});
    else next()
};


export const getUserId = (token?: string) => {
    if (token == null) return undefined;
    const tokenObject = jwt.decode(token);
    if (typeof tokenObject !== 'object' || tokenObject === null || !('userId' in tokenObject)) {
        return undefined;
    }
    return tokenObject.userId;
};