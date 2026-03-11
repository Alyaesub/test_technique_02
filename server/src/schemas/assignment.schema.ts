import { z } from 'zod'

export const createAssignmentSchema = z.object({
  housingUnitId: z.number().int().positive(),
  occupantId: z.number().int().positive(),
})

export type CreateAssignmentInput = z.infer<typeof createAssignmentSchema>