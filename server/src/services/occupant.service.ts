import { prisma } from '../lib/prisma'
import type { CreateOccupantInput } from '../schemas/occupant.schema'

export async function createOccupant(data: CreateOccupantInput) {
  return prisma.occupant.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    },
  })
}