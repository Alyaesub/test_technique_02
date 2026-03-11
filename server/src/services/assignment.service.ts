//service qui gére les assignement des logement au occupant
import { prisma } from '../lib/prisma'
import type { CreateAssignmentInput } from '../schemas/assignment.schema'
import { AppError } from '../utils/appError'

/**
 * function qui créé un assignement (une relation entre un occupant et un logement)
 * gestins des erreur si mauvaise assignement
 * et mise a jours des status du logement
 */
export async function createAssignment(data: CreateAssignmentInput) {
  return prisma.$transaction(async (tx) => {
    const housingUnit = await tx.housingUnit.findUnique({
      where: { id: data.housingUnitId },
    })

    if (!housingUnit) {
      throw new AppError(404, 'HOUSING_UNIT_NOT_FOUND', 'Housing unit not found')
    }

    const occupant = await tx.occupant.findUnique({
      where: { id: data.occupantId },
    })

    if (!occupant) {
      throw new AppError(404, 'OCCUPANT_NOT_FOUND', 'Occupant not found')
    }

    const existingAssignment = await tx.assignment.findUnique({
      where: { occupantId: data.occupantId },
    })

    if (existingAssignment) {
      throw new AppError(
        409,
        'OCCUPANT_ALREADY_ASSIGNED',
        'Occupant is already assigned to a housing unit'
      )
    }

    const assignment = await tx.assignment.create({
      data: {
        housingUnitId: data.housingUnitId,
        occupantId: data.occupantId,
      },
    })

    await tx.housingUnit.update({
      where: { id: data.housingUnitId },
      data: { status: 'OCCUPIED' },
    })

    return assignment
  })
}
