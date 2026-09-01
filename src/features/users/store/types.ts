export type FilterType = 'user' | 'tutorVerifications' | 'sparksOffers'

type Condition = {
  [key: string]: string
}

type WhereClause = {
  AND: Condition
}

type OrderByClause = Condition

type FilterWhere = {
  [key in FilterType]?: WhereClause
}

type FilterOrderBy = {
  [key in FilterType]?: OrderByClause
}

export type Filter = {
  where?: FilterWhere | null
  orderBy?: FilterOrderBy | null
}

export type TableFilter = {
  optionName: string
  filterKey: string
  filterValue: string
  customFilter?: string
  customOrder?: string
}
export type TableFilters = {
  user: TableFilter[]
  tutorVerifications: TableFilter[]
  sparksOffers: TableFilter[]
}

export interface TutorFeedbackEntry {
  id: string
  rating: number
  comment: string | null
  createdAt: string
  author: {
    id: string
    firstname: string
    lastname: string
    avatar: string | null
  }
  learnRequestTitle: string
  engagementStart: string
  engagementEnd: string | null
  billedAmount: number | string
}

type Role = 'TUTOR' | 'LEARNER'

export type User = {
  id: string
  email: string
  firstname: string
  lastname: string
  avatar: string | null
  bio?: string
  country?: string
  headline?: string
  phone?: string
  phoneCountryCode?: string
  dateOfBirth?: string
  address?: string
  city?: string
  state?: string
  postalCode?: string
  role: Role
  isProfileCompleted: boolean
  createdAt?: string
  isBlocked: boolean
}

export type UsersSlice = {
  users: {
    resetState: () => void
    filters: Filter
    setFilters: (
      appliedOn: FilterType,
      type: 'where' | 'orderBy',
      key: string,
      value: string
    ) => void
    resetFilter: () => void
    searchFilter: string
    setSearchFilter: (searchFilter: string) => void
    users: User[]
    setUsers: (user: User[]) => void
    //FILTERS----------------------------------------------------------------
    tableFilters: TableFilters
    setTableFilters: (table: keyof TableFilters, filters: TableFilter[]) => void
  }
}
