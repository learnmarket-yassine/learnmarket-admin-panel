import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosInstance } from 'axios'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { categorySkillsQueryKey } from './useGetCategorySkills'

export interface UpdateCategorySkillsVariables {
  categoryId: string
  toAdd: string[]
  toRemove: string[]
}

const updateCategorySkills = async (
  axiosPrivate: AxiosInstance,
  { categoryId, toAdd, toRemove }: UpdateCategorySkillsVariables
): Promise<void> => {
  await Promise.all([
    ...toAdd.map((skillId) => axiosPrivate.post(`/categories/${categoryId}/skills`, { skillId })),
    ...toRemove.map((skillId) =>
      axiosPrivate.delete(`/categories/${categoryId}/skills/${skillId}`)
    ),
  ])
}

const useUpdateCategorySkills = () => {
  const axiosPrivate = useAxiosPrivate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (variables: UpdateCategorySkillsVariables) =>
      updateCategorySkills(axiosPrivate, variables),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: categorySkillsQueryKey(variables.categoryId) })
    },
  })
}

export default useUpdateCategorySkills
