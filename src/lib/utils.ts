import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatBudget = (value: number | string | null | undefined) => {
  if (value === null || value === undefined) return '—'

  return new Intl.NumberFormat('en-US').format(Number(value))
}
