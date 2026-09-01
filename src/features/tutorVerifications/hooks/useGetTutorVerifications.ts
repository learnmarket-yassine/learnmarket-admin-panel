import { useInfiniteQuery } from '@tanstack/react-query'
import { AxiosInstance } from 'axios'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { useStore } from '@/store/store'
import { useEffect } from 'react'
import { TutorVerification } from '../store/types'

export const VERIFICATIONS_PAGE_SIZE = 5

export interface GetTutorVerificationsResponse {
  paginatedResult: TutorVerification[]
  totalCount: number
}

const getTutorVerifictions = async (
  axiosPrivate: AxiosInstance,
  page: number,
  take: number,
  sortDir: 'asc' | 'desc' | undefined,
  username: string | undefined
): Promise<GetTutorVerificationsResponse> => {
  const params = new URLSearchParams({ page: String(page), take: String(take) })
  if (sortDir) params.set('sortDir', sortDir)
  if (username) params.set('username', username)
  const response = await axiosPrivate.get(`/admin/tutor-verifications?${params.toString()}`)
  return response.data
}

const useGetTutorVerifications = (take = VERIFICATIONS_PAGE_SIZE) => {
  const axiosPrivate = useAxiosPrivate()
  const filters = useStore((state) => state.users.tableFilters).tutorVerifications
  const setTutorVerifications = useStore((state) => state.tutorVerifications.setTutorVerifications)

  const sortDir = filters.find(
    (filter) => filter.optionName === 'submittedAt' && filter.filterKey === 'order'
  )?.filterValue as 'asc' | 'desc' | undefined
  const username = filters.find((filter) => filter.optionName === 'username')?.filterValue

  const tutorVerificationsQuery = useInfiniteQuery({
    queryKey: ['tutorVerifications', take, sortDir, username],
    queryFn: ({ pageParam }) =>
      getTutorVerifictions(axiosPrivate, pageParam, take, sortDir, username),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) =>
      pages.length * take < lastPage.totalCount ? pages.length : undefined,
  })

  useEffect(() => {
    if (tutorVerificationsQuery.data) {
      setTutorVerifications(
        tutorVerificationsQuery.data.pages.map((page) => page.paginatedResult).flat()
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tutorVerificationsQuery.data])

  return tutorVerificationsQuery
}

export default useGetTutorVerifications
