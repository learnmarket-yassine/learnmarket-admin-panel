import { useQuery } from '@tanstack/react-query'
import { AxiosInstance } from 'axios'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { PaginatedResult, Specialty } from '../types'

export const SPECIALTIES_PAGE_SIZE = 3

const fetchSpecialties = async (
  axiosPrivate: AxiosInstance,
  categoryId: string,
  page: number,
  search: string
): Promise<PaginatedResult<Specialty>> => {
  const res = await axiosPrivate.get('/admin/specialties', {
    params: {
      categoryId,
      page,
      take: SPECIALTIES_PAGE_SIZE,
      search: search || undefined,
    },
  })
  return res.data as PaginatedResult<Specialty>
}

export const specialtiesQueryKey = (
  categoryId: string | undefined,
  page: number,
  search: string
) => ['admin-specialties', categoryId, page, search]

const useGetSpecialties = (categoryId: string | undefined, page: number, search: string) => {
  const axiosPrivate = useAxiosPrivate()

  return useQuery({
    queryKey: specialtiesQueryKey(categoryId, page, search),
    queryFn: () => fetchSpecialties(axiosPrivate, categoryId!, page, search),
    enabled: !!categoryId,
  })
}

export default useGetSpecialties
