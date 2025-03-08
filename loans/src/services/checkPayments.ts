import { prisma } from "..";
import { StatusCreditRequest } from "../domain/types/Status";

export async function checkPayments() {
    const payments = await prisma.Credit.findMany({
        where: {
            status: StatusCreditRequest.ACTIVE,
            nextPaymentDate: {
                lte: new Date().getDate()
            }
        }
    })

    if (!payments.length) return

    //send peyment request to kernel

    await prisma.creditRequest.updateMany({
        where: {
            id: {
                in: payments.map(p => p.id)
            }
        },
        data: {
            nextPaymentDate: new Date(new Date().setDate(new Date().getDay() + 1))
        }
    })
}