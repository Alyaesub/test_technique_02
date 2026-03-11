//service qui gére la création d'un logement

import { prisma } from '../lib/prisma'
import type { CreateHousingUnitInput } from '../schemas/housingUnit.schema'

export async function createHousingUnit(data: CreateHousingUnitInput) {
  const housingUnit = await prisma.housingUnit.create({
    data: {
      name: data.name,
      status: data.status ?? 'AVAILABLE',
    },
  })

  return housingUnit
}