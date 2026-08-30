import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosInstance } from 'axios'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'

const deleteSkill = async (axiosPrivate: AxiosInstance, id: string): Promise<void> => {
  await axiosPrivate.delete(`/admin/skills/${id}/hard`)
}

const useDeleteSkill = () => {
  const axiosPrivate = useAxiosPrivate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteSkill(axiosPrivate, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-skills'] })
      queryClient.invalidateQueries({ queryKey: ['category-skills'] })
    },
  })
}

export default useDeleteSkill
