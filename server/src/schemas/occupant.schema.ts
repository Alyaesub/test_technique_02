import { z } from 'zod'

export const createOccupantSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required'),
  lastName: z.string().trim().min(1, 'Last name is required'),
  email: z.string().email('Invalid email'),
})

export type CreateOccupantInput = z.infer<typeof createOccupantSchema>