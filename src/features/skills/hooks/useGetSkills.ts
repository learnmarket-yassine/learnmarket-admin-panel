import { useQuery } from '@tanstack/react-query'
import { AxiosInstance } from 'axios'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { PaginatedResult, SkillWithCounts } from '../types'

export const SKILLS_PAGE_SIZE = 6

export const skillsQueryKey = (page: number, search: string) => ['admin-skills', page, search]

const fetchSkills = async (
  axiosPrivate: AxiosInstance,
  page: number,
  search: string
): Promise<PaginatedResult<SkillWithCounts>> => {
  const res = await axiosPrivate.get('/admin/skills', {
    params: {
      page,
      limit: SKILLS_PAGE_SIZE,
      search: search || undefined,
    },
  })
  return res.data as PaginatedResult<SkillWithCounts>
}

const useGetSkills = (page: number, search: string) => {
  const axiosPrivate = useAxiosPrivate()

  return useQuery({
    queryKey: skillsQueryKey(page, search),
    queryFn: () => fetchSkills(axiosPrivate, page, search),
  })
}

export default useGetSkills
