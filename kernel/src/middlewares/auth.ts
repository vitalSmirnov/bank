import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { RolesEnum } from "../domain/types/Roles";

export async function authentificate(req : Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) res.sendStatus(401)

  jwt.verify(token!, process.env.JWT_SECRET as string, (err: any, _) => {

    if (err) res.sendStatus(403)

    next()
  })
}

export const authentificateAdmin = async (req : Request, res: Response, next: NextFunction) : Promise<void> => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) res.sendStatus(401)

  jwt.verify(token!, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
    if (err) res.status(403).send({error: 'Unauthorized'})
    const payload = decoded as {roles: RolesEnum[]};
    if (!payload.roles.includes(RolesEnum.ADMIN)) res.status(403).send({error: 'Forbidden'})
    next()
  })
}


export const getUserId = (token?: string) => {
    const tokenlist = token?.split(' ')[1]
    if (tokenlist == null) return undefined;
    const tokenObject = jwt.decode(tokenlist);
    if (typeof tokenObject !== 'object' || tokenObject === null || !('userId' in tokenObject)) {
        return undefined;
    }
    return tokenObject.userId;
};