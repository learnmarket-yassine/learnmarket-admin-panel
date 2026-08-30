export interface Category {
  id: string
  name: string
  slug: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  _count: {
    specialties: number
  }
}

export interface Specialty {
  id: string
  categoryId: string
  name: string
  slug: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Skill {
  id: string
  name: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface PaginatedResult<T> {
  data: T[]
  total: number
  page: number
  hasMore: boolean
}
