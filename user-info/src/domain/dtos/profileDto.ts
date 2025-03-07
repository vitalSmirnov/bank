import { RolesEnum } from "../types/Roles"

export interface ProfileDto {
    id: string
    email: string
    name: string
    birthdate: Date
    description: string | null
    roles: RolesEnum[]
}