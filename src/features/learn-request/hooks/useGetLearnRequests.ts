import { useInfiniteQuery } from '@tanstack/react-query'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import {
  LearnRequest,
  LearnRequestStatus,
  LearnRequestType,
  ProficiencyLevel,
} from '../store/types'
import { useStore } from '@/store/store'
import { AxiosInstance } from 'axios'
import useDebounce from '@/hooks/useDebounce'

export interface LearnRequestFilters {
  status?: LearnRequestStatus[]
  categoryId?: string
  type?: LearnRequestType[]
  search?: string
  actionNeeded?: boolean
  level?: ProficiencyLevel[]
  budgetMin?: number
  budgetMax?: number
  preferredLanguages?: string[]
  requestedFrequency?: number[]
}

export interface GetLearnRequestsResponse {
  paginatedResult: LearnRequest[]
  totalCount: number
}

export const LEARN_REQUESTS_PAGE_SIZE = 10

const fetchLearnRequests = async (
  {
    filters,
    page,
    take,
  }: {
    filters: LearnRequestFilters
    page: number
    take: number
  },
  axiosPrivate: AxiosInstance
): Promise<GetLearnRequestsResponse> => {
  const params = new URLSearchParams()
  if (filters.status?.length) params.set('status', filters.status.join(','))
  if (filters.categoryId) params.set('categoryId', filters.categoryId)
  if (filters.type?.length) params.set('type', filters.type.join(','))
  if (filters.search) params.set('search', filters.search)
  if (filters.actionNeeded) params.set('actionNeeded', 'true')
  if (filters.level?.length) params.set('level', filters.level.join(','))
  if (filters.budgetMin !== undefined) params.set('budgetMin', String(filters.budgetMin))
  if (filters.budgetMax !== undefined) params.set('budgetMax', String(filters.budgetMax))
  if (filters.preferredLanguages?.length) {
    params.set('preferredLanguages', filters.preferredLanguages.join(','))
  }
  if (filters.requestedFrequency?.length) {
    params.set('requestedFrequency', filters.requestedFrequency.join(','))
  }
  params.set('page', String(page))
  params.set('take', String(take))

  const res = await axiosPrivate.get(`/learn-requests?${params.toString()}`)
  return res.data as GetLearnRequestsResponse
}

const useGetLearnRequests = (filters: LearnRequestFilters, options?: { enabled?: boolean }) => {
  const axiosPrivate = useAxiosPrivate()
  const searchWord = useStore((state) => state.learnRequest.searchWord)
  const debouncedSearchWord = useDebounce(searchWord)

  return useInfiniteQuery({
    queryKey: ['learn-requests', filters],
    queryFn: ({ pageParam }) =>
      fetchLearnRequests(
        {
          filters: { ...filters, search: debouncedSearchWord },
          page: pageParam,
          take: LEARN_REQUESTS_PAGE_SIZE,
        },
        axiosPrivate
      ),
    initialPageParam: 0,
    enabled: options?.enabled !== false,
    getNextPageParam: (lastPage, allPages) => {
      const pageNumbers = Math.ceil(lastPage.totalCount / LEARN_REQUESTS_PAGE_SIZE)
      const currentPage = allPages.length
      if (currentPage < pageNumbers && currentPage !== pageNumbers) {
        return currentPage
      }
      return undefined
    },
  })
}

export default useGetLearnRequests
