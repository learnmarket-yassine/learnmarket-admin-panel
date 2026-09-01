import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosInstance } from 'axios'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'

const blockUser = async (axiosPrivate: AxiosInstance, id: string) => {
  const res = await axiosPrivate.post(`admin/users/${id}/block`)
  return res.data
}

const useBlockUser = () => {
  const axiosPrivate = useAxiosPrivate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => blockUser(axiosPrivate, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

export default useBlockUser
