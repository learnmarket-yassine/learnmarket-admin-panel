import { SessionStatus } from '../components/ui/SessionBoardRow'

export type LearnRequestType = 'ONE_TIME' | 'COURSE'
export type ProficiencyLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
export type LearnRequestStatus = 'DRAFT' | 'OPEN' | 'CLOSED' | 'CANCELLED' | 'COMPLETED' | 'REMOVED'
export type HoldStatus = 'ACTIVE' | 'EXPIRED' | 'CONVERTED'
export interface Skill {
  id: string
  name: string
  isActive?: boolean
}

export interface Category {
  id: string
  name: string
  slug?: string
  isActive?: boolean
}

export type TutorVerificationStatus =
  'UNSUBMITTED' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'REVOKED'

export interface ProposalTutorSummary {
  id: string
  firstname: string
  lastname: string
  avatar: string | null
  headline: string | null
  country: string | null
  bio: string | null
  languages: Language[] | null
  tutorProfile: {
    skills: { skill: Skill }[]
    videoIntroUrl: string | null
    verificationStatus: TutorVerificationStatus
  } | null
}

export enum LanguageLevel {
  BASIC = 'BASIC',
  CONVERSATIONAL = 'CONVERSATIONAL',
  FLUENT = 'FLUENT',
  NATIVE_OR_BILINGUAL = 'NATIVE_OR_BILINGUAL',
}

export interface Language {
  id?: string
  profileId?: string
  language: string
  level: LanguageLevel
}

export type ProposalStatus = 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'WITHDRAWN'

export type PayoutMethod = 'PER_SESSION' | 'ON_COMPLETION'

export interface ProposalSessionPlan {
  id: string
  proposalId: string
  sessionNumber: number
  title: string
  objective: string | null
}
export interface Proposal {
  id: string
  learnRequestId: string
  learnRequest: LearnRequest
  tutorId: string
  status: ProposalStatus
  sessionDurationMinutes: number
  totalPrice: number | string
  tutorTotal: number
  serviceFee: number
  payoutMethod: PayoutMethod
  message: string | null
  sessionPlans: ProposalSessionPlan[]
  tutor: ProposalTutorSummary
  learnerViewedAt: string | null
  createdAt: string
  updatedAt: string
  isShortlisted?: boolean
  sessions?: Session[]
}

export type MeetingDetails =
  | { status: 'not_provisioned'; canJoinYet: false }
  | {
      status: 'provisioned'
      canJoinYet: boolean
      joinUrl: string
    }

export interface SlotHold {
  id: string
  tutorId: string
  learnerId: string
  sessionId: string
  startTime: string
  endTime: string
  status: HoldStatus
  expiresAt: string
  createdAt: string
}

export interface Session {
  id: string
  proposalId: string
  sessionNumber: number
  title: string
  objective: string | null
  status: SessionStatus
  createdAt: string
  updatedAt: string
  slotHold?: SlotHold | null
}
export interface LearnRequest {
  id: string
  learnerId: string
  learner?: {
    id: string
    firstname: string
    lastname: string
    city: string
    country: string
  } | null
  status: LearnRequestStatus
  type: LearnRequestType | null
  title: string
  categoryId: string | null
  category: Category | null
  level: ProficiencyLevel | null
  description: string | null
  preferredLanguages: string[]
  requestedFrequency: number | null
  budgetMin: string | number | null
  budgetMax: string | number | null
  skills: { skill: Skill }[]
  proposals?: Proposal[]
  actionNeeded: boolean
  isSavedByMe?: boolean
  createdAt: string
  updatedAt: string
}
export interface TutorRatingSummary {
  averageRating: number | null
  reviewCount: number
}
export interface LearnRequestStats {
  requestCount: number
  hireRate: number
}

export interface CommentAuthor {
  id: string
  firstname: string
  lastname: string
  avatar: string | null
}

export interface AnnouncementAttachment {
  id: string
  key: string
  fileName: string
  mimeType: string | null
  fileSize: number | null
  createdAt: string
}

export interface Announcement {
  id: string
  sessionId: string
  authorId: string
  content: string
  createdAt: string
  author: CommentAuthor
  attachments: AnnouncementAttachment[]
  comments: AnnouncementComment[]
}

export interface AnnouncementComment {
  id: string
  content: string
  createdAt: string
  author: CommentAuthor
}

type LearnRequestState = {
  clickedLearnRequestName: string
  setClickedLearnRequestName: (learnRequest: string) => void
  searchWord: string
  setSearchWord: (searchWord: string) => void
  formStep: number
  setFormStep: (step: number) => void
  resetState: () => void
}
export type LearnRequestSlice = {
  learnRequest: LearnRequestState
}
