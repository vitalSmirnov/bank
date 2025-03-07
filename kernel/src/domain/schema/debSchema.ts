import { CurrencyEnum } from '../types/currency'
import { DebType } from '../types/typesDeb'

export interface IDeb {
    userId: string
    id: string
    amount: number
    description: string
    currency: CurrencyEnum
    createdAt: Date
    closedAt?: Date
    closed?: boolean
    type: DebType
}