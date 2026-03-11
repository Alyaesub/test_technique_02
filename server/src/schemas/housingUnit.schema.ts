//schema zod pour création logements
import { z } from 'zod'

export const createHousingUnitSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  status: z.enum(['AVAILABLE', 'OCCUPIED', 'MAINTENANCE']).optional(),
})

export type CreateHousingUnitInput = z.infer<typeof createHousingUnitSchema>