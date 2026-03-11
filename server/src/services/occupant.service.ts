import { prisma } from '../lib/prisma'
import type { CreateOccupantInput } from '../schemas/occupant.schema'

//function qui créé un occupant
export async function createOccupant(data: CreateOccupantInput) {
  return prisma.occupant.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    },
  })
}

//function qui get un occupant
export async function getAllOccupants() {
  return prisma.occupant.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}