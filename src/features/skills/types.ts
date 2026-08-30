export interface Skill {
  id: string
  name: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface SkillWithCounts extends Skill {
  _count: {
    categorySkills: number
    tutorProfiles: number
  }
}

export interface PaginatedResult<T> {
  data: T[]
  total: number
  page: number
  hasMore: boolean
}
