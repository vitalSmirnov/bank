import { prisma } from ".."

export const getDeb = async (debId: string) => {
  const deb = await prisma.deb.findUnique({
    where: {
      id: debId
    }
  })
  return deb
}

export const getFilteredDebs = async (userId?: string, debId?: string) => {
  const debs = await prisma.deb.findMany({
    where: {
      id: debId,
      userId: userId
    }
  })
  return debs
}

export const getUserDebs = async (userId: string) => {
  const debs = await prisma.deb.findMany({
    where: {
      userId
    }
  })
  return debs
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