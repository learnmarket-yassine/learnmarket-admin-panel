import { z } from 'zod'

export const createSparksOfferSchema = z.object({
  name: z.string().min(1, 'Name is required'),

  sparksAmount: z
    .number()
    .int('Sparks amount must be an integer')
    .positive('Sparks amount must be greater than 0'),

  priceCents: z.number().int('Price must be an integer').positive('Price must be greater than 0'),

  currency: z.string().min(1, 'Currency cannot be empty').optional(),

  displayOrder: z
    .number()
    .int('Display order must be an integer')
    .min(0, 'Display order must be greater than or equal to 0')
    .optional(),
})
