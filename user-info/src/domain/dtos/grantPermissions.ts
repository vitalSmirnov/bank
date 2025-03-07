import { RolesEnum } from "../types/Roles"

export interface GrantPermissions {
    userId: string
    permission: RolesEnum
    type: PermissionType
}


export enum PermissionType {
    ADD = 'add',
    REMOVE = 'remove'
}