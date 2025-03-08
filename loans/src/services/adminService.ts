import { prisma } from "..";
import { StatusCreditRequest } from "../domain/types/Status";



export async function acceptRequest(ticketId: string) {
    const response = await prisma.creditRequest.update({
        where: {
            id: ticketId
        },
        data: {
            status: StatusCreditRequest.ACTIVE
        }})

        return response
}


export async function closeCreditDeb(ticketId: string) {
    const response = await prisma.creditRequest.update({
        where: {
            id: ticketId
        },
        data: {
            status: StatusCreditRequest.CLOSED,
            closeDate: new Date()
        }})

        return response
}


export async function setStatus(ticketId: string, status: StatusCreditRequest) {
    const response = await prisma.creditRequest.update({
        where: {
            id: ticketId
        },
        data: {
            status: status,
            closeDate: new Date()
        }})

        return response
}