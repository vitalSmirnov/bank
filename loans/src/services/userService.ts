import { prisma } from ".."
import { CreateCreditModel } from "../domain/dtos/createCreditModel"

export async function createRequest(model: CreateCreditModel, userId: string) {
    const response = await prisma.creditRequest.create({
        data: {
            amount: model.amount,
            userId: userId
        }})

        return response

}