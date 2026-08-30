import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosInstance } from 'axios'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'

const unblockUser = async (axiosPrivate: AxiosInstance, id: string) => {
  const res = await axiosPrivate.post(`admin/users/${id}/unblock`)
  return res.data
}

const useUnblockUser = () => {
  const axiosPrivate = useAxiosPrivate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => unblockUser(axiosPrivate, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

export default useUnblockUser
