import { IDeb } from "../domain/schema/debSchema"
import { prisma } from ".."
import { DebType } from "../domain/types/typesDeb"

export const createDeb = async (debModel: Omit<IDeb, "id" | "createdAt" | 'amount'>) : Promise<IDeb> => {
  const id = crypto.randomUUID()
  const newDeb = await prisma.deb.create({
  data: {
    ...debModel,
    id,
    createdAt: new Date(),
    type: DebType.DEBIT
  }
})
  return newDeb as IDeb
}

export const createCreditDeb = async (debModel: Omit<IDeb, "id" | "createdAt" | 'amount'>) => {
  const id = crypto.randomUUID()
  const newDeb = await prisma.deb.create({
  data: {
    ...debModel,
    id,
    createdAt: new Date(),
    type: DebType.CREDIT
  }
})
  return newDeb
}

export const getDeb = async (userId: string, debId: string) => {
  const deb = await prisma.deb.findUnique({
    where: {
      id: debId,
      userId: userId,
      closed: false
    }
  })
  return deb
}

export const getUserDebs = async (userId: string) => {
  const debs = await prisma.deb.findMany({
    where: {
      userId,
      closed: false
    }
  })
  return debs
}

export const updateDeb = async (debId: string, debModel: Partial<IDeb>) => {
  const deb = await prisma.deb.update({
    where: {
      id: debId,
      closed: false
    },
    data: debModel
  })
  return deb
}

export const closeDeb = async (debId: string) => {
  const deb = await prisma.deb.update({
    where: {
      id: debId
    },
    data: {
      closedAt: new Date(),
      closed: true
    }
  })
  return deb
}

export const purchaseMoney = async (debId: string, amount: number) => {

  if (amount <= 0) {
    throw new Error('Amount must be greater than 0')
  }

  const deb = await prisma.deb.findUnique({
    where: {
      id: debId
    },
  })
  if (deb === null) throw new Error('Not Found Deb')
  if (deb.amount < amount) {
    throw new Error('Not enough money')
  }
    const newAmount = deb.amount - amount
    const updatedDeb = await prisma.deb.update({
      where: {
        id: debId,
        closed: false
      },
      data: {
        amount: newAmount
      }})

    return updatedDeb
}

export const intakeMoney = async (debId: string, amount: number) => {
  
  if (amount <= 0) {
    throw new Error('Amount must be greater than 0')
  }

  const deb = await prisma.deb.findUnique({
    where: {
      id: debId,
      closed: false
    },
  })
  if (deb === null) {
    throw new Error('Not Found Deb')
  }
    const updatedDeb = await prisma.deb.update({
      where: {
        id: debId
      },
      data: {
        amount: {
          increment: amount
        }
      }})

    return updatedDeb
}

export const transferMoney = async (senderId: string, recieverId: string, amount: number) => {
  
  if (amount <= 0) {
    throw new Error('Amount must be greater than 0')
  }

  const sender = await prisma.deb.findUnique({
    where: {
      id: senderId,
      closed: false
    },
  })
  const reciever = await prisma.deb.findUnique({
    where: {
      id: recieverId,
      closed: false
    },
  })

  if (sender === null || reciever === null) {
    throw new Error('Not Found Sender or Reciever Deb')
  }
  if (sender?.amount < amount) {
    throw new Error('Not Found Reciever Deb')
  }

  await prisma.deb.update({
    where: {
      id: senderId
    },
    data: {
      amount: {
        decrement: amount
      }
    }})
    await prisma.deb.update({
    where: {
      id: recieverId
    },
    data: {
      amount: {
        decrement: amount
      }
    }})

    return {}
}