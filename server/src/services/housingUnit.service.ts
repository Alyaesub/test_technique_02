//service qui gére la création et la récupération des logement

//function qui créé un logement
import { prisma } from '../lib/prisma'
import type { CreateHousingUnitInput } from '../schemas/housingUnit.schema'

export async function createHousingUnit(data: CreateHousingUnitInput) {
  const housingUnit = await prisma.housingUnit.create({
    data: {
      name: data.name,
      status: data.status ?? 'AVAILABLE',
    },
  })
}

//function qui récupére en get les logements
export async function getHousingUnits() {
  return prisma.housingUnit.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
}