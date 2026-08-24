import { SessionStatus } from '@/features/learn-request/components/ui/SessionItem'
import {
  LearnRequestStatus,
  LearnRequestType,
  PayoutMethod,
  ProficiencyLevel,
  ProposalStatus,
} from '@/features/learn-request/store/types'
import { SessionStatusConfig } from '@/features/session/components/ui/MeetingCard'

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

export const PAYOUT_METHOD_LABELS: Record<PayoutMethod, string> = {
  PER_SESSION: 'By Session',
  ON_COMPLETION: 'By Course',
}

export const PROPOSAL_STATUS_LABELS: Record<ProposalStatus, string> = {
  PENDING: 'Pending',
  ACCEPTED: 'Hired',
  DECLINED: 'Declined',
  WITHDRAWN: 'Withdrawn',
}

export const SESSION_STATUS_CONFIG: Record<SessionStatus, SessionStatusConfig> = {
  LOCKED: { label: 'Locked', badgeBg: 'bg-slate-100', badgeText: 'text-slate-600' },
  PENDING_SCHEDULE: {
    label: 'Ready to schedule',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-[#2563EB]',
  },
  HELD: { label: 'Pending confirmation', badgeBg: 'bg-amber-100', badgeText: 'text-amber-700' },
  BOOKED: { label: 'Booked', badgeBg: 'bg-emerald-100', badgeText: 'text-emerald-700' },
  PENDING_REVIEW: {
    label: 'Awaiting review',
    badgeBg: 'bg-purple-100',
    badgeText: 'text-purple-700',
  },
  COMPLETED: { label: 'Completed', badgeBg: 'bg-slate-200', badgeText: 'text-slate-700' },
  CANCELLED: { label: 'Cancelled', badgeBg: 'bg-red-100', badgeText: 'text-red-700' },
}
