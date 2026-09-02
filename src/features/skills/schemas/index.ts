import { z } from 'zod'

export const skillSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(50, 'Name must be 50 characters or fewer'),
})

export type SkillFormValues = z.infer<typeof skillSchema>
