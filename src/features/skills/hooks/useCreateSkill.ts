import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosInstance } from 'axios'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { SkillWithCounts } from '../types'

export interface CreateSkillPayload {
  name: string
}

const createSkill = async (
  axiosPrivate: AxiosInstance,
  payload: CreateSkillPayload
): Promise<SkillWithCounts> => {
  const res = await axiosPrivate.post('/admin/skills', payload)
  return res.data as SkillWithCounts
}

const useCreateSkill = () => {
  const axiosPrivate = useAxiosPrivate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateSkillPayload) => createSkill(axiosPrivate, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-skills'] })
    },
  })
}

export default useCreateSkill
