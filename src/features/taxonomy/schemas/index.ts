import { z } from 'zod'

const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/

const slugField = z
  .string()
  .trim()
  .min(1, 'Slug is required')
  .max(120, 'Slug must be 120 characters or fewer')
  .regex(SLUG_PATTERN, 'Use lowercase letters, numbers, and hyphens only')

export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(100, 'Name must be 100 characters or fewer'),
  slug: slugField,
})

export type CategoryFormValues = z.infer<typeof categorySchema>

export const specialtySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(100, 'Name must be 100 characters or fewer'),
  slug: slugField,
})

export type SpecialtyFormValues = z.infer<typeof specialtySchema>
