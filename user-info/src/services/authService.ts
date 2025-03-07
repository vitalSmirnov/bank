import { prisma } from ".."
import { LoginCredentials } from "../domain/dtos/loginCredentials"
import { RegisterCredentials } from "../domain/dtos/registerCredentials"
import { TokenDto } from "../domain/dtos/tokenDto"
import { RolesEnum } from "../domain/types/Roles"
import { createToken } from "../utility/auth/tokens"


export const login = async (loginModel: LoginCredentials) : Promise<TokenDto> => {
  const user = await prisma.user.findUnique({
    where: {
      password: loginModel.password,
      email: loginModel.email
    }
  })
  if (!user) throw new Error('Invalid credentials')

  return createToken({
    userId: user.id,
    email: user.email,
    roles: user.roles as RolesEnum[]
})
}

export const register = async (registerModel: RegisterCredentials): Promise<TokenDto> => {
    const id = crypto.randomUUID()
  await prisma.user.create({
    data:{
        id: id,
        email: registerModel.email,
        password: registerModel.password,
        name: registerModel.firstName + ' ' + registerModel.lastName,
        birthdate: registerModel.birthdate, 
        description: registerModel.description,
        roles: [RolesEnum.USER]
    }
  })

  return createToken({
    userId: id,
    email: registerModel.email,
    roles: [RolesEnum.USER]
    })
}

export const logout = async (userId: string, token: string) => {
    const id = crypto.randomUUID()
    const tokenModel = await prisma.token.create({
        data:{
            id: id,
            token: token,
        }})
  await prisma.user.update({
    where: {
        id: userId
    },
    data:{
        tokens: {
            connect: {
                id: tokenModel.id
            }
        }
    }
  })

}