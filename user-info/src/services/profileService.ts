import { prisma } from ".."
import { GrantPermissions, PermissionType } from "../domain/dtos/grantPermissions"
import { ProfileDto } from "../domain/dtos/profileDto"
import { FilteredProfiles } from "../domain/types/filteredProfiles"
import { RolesEnum } from "../domain/types/Roles"


export const profile = async (userId: string) : Promise<ProfileDto> => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })
  if (!user) throw new Error('Not found')

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    birthdate: user.birthdate,
    description: user.description || '',
    roles: user.roles as RolesEnum[]
  }
}

export const users = async ({userId, name, email} : FilteredProfiles): Promise<ProfileDto[]> => {
    console.log(name)
    const users = await prisma.user.findMany({
    where: {
        name: {
            contains: name,
        },
        id: {
            contains: userId,
        },
        email: {
            contains: email,
        }
    },
    select: {
        id: true,
        email: true,
        name: true,
        birthdate: true,
        description: true,
        roles: true
    }
})

  return users.map(user => ({
    id: user.id,
    email: user.email,
    name: user.name,
    birthdate: user.birthdate,
    description: user.description || '',
    roles: user.roles as RolesEnum[]
  }))
}

export const grant = async ({userId, permission, type}: GrantPermissions) => {
    if (type === PermissionType.ADD) {
        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data:{
                roles: {
                    set: [permission]
                }
            }
        })
        return user

    }
    else {
        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data:{
                roles: {
                    set: [RolesEnum.USER]
                }
            }
        })
        return user
    }
}