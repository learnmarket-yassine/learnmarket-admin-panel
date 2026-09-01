import { useInfiniteQuery } from '@tanstack/react-query'
import { AxiosInstance } from 'axios'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { useStore } from '@/store/store'
import { useEffect } from 'react'
import { SparksOffer } from '../store/types'

export const OFFERS_PAGE_SIZE = 5

export interface GetOffersResponse {
  paginatedResult: SparksOffer[]
  totalCount: number
}

const getOffers = async (
  axiosPrivate: AxiosInstance,
  page: number,
  take: number,
  sortDir: 'asc' | 'desc' | undefined,
  name: string | undefined
): Promise<GetOffersResponse> => {
  const params = new URLSearchParams({ page: String(page), take: String(take) })
  if (sortDir) params.set('sortDir', sortDir)
  if (name) params.set('name', name)
  const response = await axiosPrivate.get(`/admin/sparks-offers?${params.toString()}`)
  return response.data
}

const useGetOffers = (take = OFFERS_PAGE_SIZE) => {
  const axiosPrivate = useAxiosPrivate()
  const filters = useStore((state) => state.users.tableFilters).sparksOffers
  const setSparksOffers = useStore((state) => state.sparksOffers.setSparksOffers)

  const sortDir = filters.find(
    (filter) => filter.optionName === 'createdAt' && filter.filterKey === 'order'
  )?.filterValue as 'asc' | 'desc' | undefined
  const name = filters.find((filter) => filter.optionName === 'name')?.filterValue

  const sparksOffersQuery = useInfiniteQuery({
    queryKey: ['sparksOffers', take, sortDir, name],
    queryFn: ({ pageParam }) => getOffers(axiosPrivate, pageParam, take, sortDir, name),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) =>
      pages.length * take < lastPage.totalCount ? pages.length : undefined,
    placeholderData: (previousData) => previousData,
  })

  useEffect(() => {
    if (sparksOffersQuery.data) {
      setSparksOffers(sparksOffersQuery.data.pages.map((page) => page.paginatedResult).flat())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sparksOffersQuery.data])

  return sparksOffersQuery
}

export default useGetOffers
