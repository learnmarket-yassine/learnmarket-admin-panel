import {
  LearnRequestStatus,
  LearnRequestType,
  ProficiencyLevel,
} from '@/features/learn-request/store/types'

export const PASSWORD_RULES = [
  {
    id: 'length',
    label: 'At least 8 characters',
    test: (v: string) => v.length >= 8,
    isError: false,
  },
  {
    id: 'numberOrSymbol',
    label: 'At least one number or symbol',
    test: (v: string) => /[\d!@#%^&*()_+\-=[\]{}':",./~]/.test(v),
    isError: false,
  },
  {
    id: 'upperAndLower',
    label: 'At least one uppercase and one lowercase letter',
    test: (v: string) => /[A-Z]/.test(v) && /[a-z]/.test(v),
    isError: false,
  },
  {
    id: 'restricted',
    label: 'Restricted characters: ` \' " \\ ; | < > $',
    test: (v: string) => /[`'"\\;|<>$]/.test(v),
    isError: true,
  },
] as const

export const TYPE_LABELS: Record<LearnRequestType, string> = {
  ONE_TIME: 'One-time session',
  COURSE: 'Ongoing course',
}

export const LEVEL_LABELS: Record<ProficiencyLevel, string> = {
  BEGINNER: 'Beginner',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced',
}

export const STATUS_LABELS: Record<LearnRequestStatus, string> = {
  DRAFT: 'Draft',
  OPEN: 'Open',
  CLOSED: 'Closed',
  CANCELLED: 'Cancelled',
  COMPLETED: 'Completed',
  REMOVED: 'Removed',
}

export function formatLabel<T extends string>(
  labels: Record<T, string>,
  value: T | null | undefined
): string {
  return value ? labels[value] : 'Not set'
}
