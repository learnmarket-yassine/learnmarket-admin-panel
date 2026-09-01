import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosInstance } from 'axios'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'

export type ApproveTutorVerificationResponse = {
  userId: string
  verificationStatus: string
}

const approveTutorVerification = async (
  axiosPrivate: AxiosInstance,
  id: string
): Promise<ApproveTutorVerificationResponse> => {
  const res = await axiosPrivate.post(`admin/tutor-verifications/${id}/approve`)
  return res.data
}

const useApproveTutorVerification = () => {
  const axiosPrivate = useAxiosPrivate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => approveTutorVerification(axiosPrivate, id),
    onSuccess: (data: ApproveTutorVerificationResponse) => {
      queryClient.invalidateQueries({ queryKey: ['tutorVerifications'] })
      queryClient.invalidateQueries({ queryKey: ['users', data.userId, 'profile'] })
    },
  })
}

export default useApproveTutorVerification
