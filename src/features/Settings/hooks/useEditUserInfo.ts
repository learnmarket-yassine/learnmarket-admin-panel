import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import ToastMessage from '@/components/layout/ToastMessage'

export type userToEdit = {
  firstname: string
  lastname: string
  avatar: string
  headline: string
  bio?: string
  country: string
  phone?: string
  phoneCountryCode?: string
  dateOfBirth?: string
  address?: string
  city?: string
  state?: string
  postalCode?: string
  oldPassword?: string
  newPassword?: string
}

const useEditUserInfo = () => {
  const queryClient = useQueryClient()
  const axiosPrivate = useAxiosPrivate()
  return useMutation({
    mutationFn: async (payload: Partial<userToEdit>): Promise<userToEdit> => {
      const response = await axiosPrivate.patch(`/users/me`, payload)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['UserInfo'] })
      ToastMessage({ type: 'success', message: 'Profile updated.' })
    },
    onError: () => {
      ToastMessage({ type: 'error', message: 'Failed to update profile. Please try again.' })
    },
  })
}

export default useEditUserInfo
