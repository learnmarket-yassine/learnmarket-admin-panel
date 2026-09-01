import { useInfiniteQuery } from '@tanstack/react-query'
import { AxiosInstance } from 'axios'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { useStore } from '@/store/store'
import { User } from '../store/types'
import { useEffect } from 'react'

export const USERS_PAGE_SIZE = 5

export interface GetUsersResponse {
  paginatedResult: User[]
  totalCount: number
}

const getUsers = async (
  axiosPrivate: AxiosInstance,
  page: number,
  take: number,
  sortDir: 'asc' | 'desc' | undefined,
  role: string | undefined,
  country: string | undefined,
  username: string | undefined
): Promise<GetUsersResponse> => {
  const params = new URLSearchParams({ page: String(page), take: String(take) })
  if (sortDir) params.set('sortDir', sortDir)
  if (role) params.set('role', role)
  if (country) params.set('country', country)
  if (username) params.set('username', username)
  const response = await axiosPrivate.get(`/admin/users?${params.toString()}`)
  return response.data
}

const useGetUsers = (take = USERS_PAGE_SIZE) => {
  const axiosPrivate = useAxiosPrivate()
  const filters = useStore((state) => state.users.tableFilters).user
  const setUsers = useStore((state) => state.users.setUsers)

  const sortDir = filters.find(
    (filter) => filter.optionName === 'createdAt' && filter.filterKey === 'order'
  )?.filterValue as 'asc' | 'desc' | undefined
  const status = filters.find(
    (filter) => filter.optionName === 'role' && filter.filterKey === 'radio'
  )?.filterValue
  const country = filters.find(
    (filter) => filter.optionName === 'country' && filter.filterKey === 'radio'
  )?.filterValue
  const username = filters.find((filter) => filter.optionName === 'username')?.filterValue

  const usersQuery = useInfiniteQuery({
    queryKey: ['users', take, sortDir, status, country, username],
    queryFn: ({ pageParam }) =>
      getUsers(axiosPrivate, pageParam, take, sortDir, status, country, username),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) =>
      pages.length * take < lastPage.totalCount ? pages.length : undefined,
    placeholderData: (previousData) => previousData,
  })

  useEffect(() => {
    if (usersQuery.data) {
      setUsers(usersQuery.data.pages.map((page) => page.paginatedResult).flat())
    }
  }, [usersQuery.data])

  return usersQuery
}

export default useGetUsers
