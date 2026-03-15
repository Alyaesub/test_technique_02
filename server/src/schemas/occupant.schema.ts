import { z } from 'zod'

export const createOccupantSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required').max(255, 'too long').toLowerCase().nonoptional(),
  lastName: z.string().trim().min(1, 'Last name is required').max(255, 'too long').toLowerCase().nonoptional(),
  email: z.string().email('Invalid email').max(255, 'too long').toLowerCase().nonoptional(),
}).strict()

export type CreateOccupantInput = z.infer<typeof createOccupantSchema>