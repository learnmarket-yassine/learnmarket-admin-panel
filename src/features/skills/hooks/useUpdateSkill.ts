import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosInstance } from 'axios'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { SkillWithCounts } from '../types'

export interface UpdateSkillPayload {
  name?: string
  isActive?: boolean
}

export interface UpdateSkillVariables {
  id: string
  payload: UpdateSkillPayload
}

const updateSkill = async (
  axiosPrivate: AxiosInstance,
  { id, payload }: UpdateSkillVariables
): Promise<SkillWithCounts> => {
  const res = await axiosPrivate.patch(`/admin/skills/${id}`, payload)
  return res.data as SkillWithCounts
}

const useUpdateSkill = () => {
  const axiosPrivate = useAxiosPrivate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (variables: UpdateSkillVariables) => updateSkill(axiosPrivate, variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-skills'] })
      queryClient.invalidateQueries({ queryKey: ['category-skills'] })
    },
  })
}

export default useUpdateSkill
