//service qui gére la création et la récupération des logement
import { prisma } from '../lib/prisma'
import type { CreateHousingUnitInput } from '../schemas/housingUnit.schema'
import { AppError } from '../utils/appError'

//function qui créé un logement
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

//function qui recuépre un logemnt et son occupant assigné et qui return les id de chacun
export async function getHousingUnitOccupants(housingUnitId: number) {
  const housingUnit = await prisma.housingUnit.findUnique({
    where: { id: housingUnitId },
    include: {
      assignments: {
        include: {
          occupant: true,
        },
      },
    },
  })

  if (!housingUnit) {
    throw new AppError(404, 'HOUSING_UNIT_NOT_FOUND', 'Housing unit not found')
  }

  return {
    housingUnit: {
      id: housingUnit.id,
      name: housingUnit.name,
      status: housingUnit.status,
      createdAt: housingUnit.createdAt,
      updatedAt: housingUnit.updatedAt,
    },
    occupants: housingUnit.assignments.map((assignment) => assignment.occupant),
  }
}