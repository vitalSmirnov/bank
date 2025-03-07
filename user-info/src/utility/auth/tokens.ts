import { TokenDto } from "../../domain/dtos/tokenDto"
import { RolesEnum } from "../../domain/types/Roles"
import jwt from 'jsonwebtoken'

type CreateTokenModel = {
    userId: string
    email: string
    roles: RolesEnum[]
}

const JWT_SECRET = process.env.JWT_SECRET

export const createToken = ({userId, email, roles} : CreateTokenModel): TokenDto => {
    const token = jwt.sign({userId, email, roles}, JWT_SECRET!, {expiresIn: '1h'})
    const refreshToken = jwt.sign({userId, email, roles}, JWT_SECRET!, {expiresIn: '7d'})

    return {
        accessToken: token,
        refreshToken: refreshToken
    }
}


export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET!)
}