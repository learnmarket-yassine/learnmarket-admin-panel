import { useQuery } from '@tanstack/react-query'
import { AxiosInstance } from 'axios'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { Skill } from '../types'

export const categorySkillsQueryKey = (categoryId: string) => ['category-skills', categoryId]

const fetchCategorySkills = async (
  axiosPrivate: AxiosInstance,
  categoryId: string
): Promise<Skill[]> => {
  const res = await axiosPrivate.get(`/categories/${categoryId}/skills`)
  return res.data as Skill[]
}

const useGetCategorySkills = (categoryId: string) => {
  const axiosPrivate = useAxiosPrivate()

  return useQuery({
    queryKey: categorySkillsQueryKey(categoryId),
    queryFn: () => fetchCategorySkills(axiosPrivate, categoryId),
  })
}

export default useGetCategorySkills
