//schema zod pour création logements
import { z } from 'zod'

export const createHousingUnitSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(255, 'too long').toLowerCase().nonoptional(),
  status: z.enum(['AVAILABLE', 'OCCUPIED', 'MAINTENANCE']).optional(),
}).strict()

export type CreateHousingUnitInput = z.infer<typeof createHousingUnitSchema>