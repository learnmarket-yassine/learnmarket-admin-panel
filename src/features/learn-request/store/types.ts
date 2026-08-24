export type LearnRequestType = 'ONE_TIME' | 'COURSE'
export type ProficiencyLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
export type LearnRequestStatus = 'DRAFT' | 'OPEN' | 'CLOSED' | 'CANCELLED' | 'COMPLETED' | 'REMOVED'
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
  // proposals?: Proposal[]
  actionNeeded: boolean
  isSavedByMe?: boolean
  createdAt: string
  updatedAt: string
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
