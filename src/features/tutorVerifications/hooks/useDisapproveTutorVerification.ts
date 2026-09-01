import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosInstance } from 'axios'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { ApproveTutorVerificationResponse } from './useApproveTutorVerification'

interface DisapproveTutorVerificationParams {
  id: string
  reason: string
}

const disapproveTutorVerification = async (
  axiosPrivate: AxiosInstance,
  id: string,
  reason: string
): Promise<ApproveTutorVerificationResponse> => {
  const res = await axiosPrivate.post(`admin/tutor-verifications/${id}/reject`, {
    reason,
  })

  return res.data
}

const useDisapproveTutorVerification = () => {
  const axiosPrivate = useAxiosPrivate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, reason }: DisapproveTutorVerificationParams) =>
      disapproveTutorVerification(axiosPrivate, id, reason),

    onSuccess: (data: ApproveTutorVerificationResponse) => {
      queryClient.invalidateQueries({ queryKey: ['tutorVerifications'] })
      queryClient.invalidateQueries({ queryKey: ['users', data.userId, 'profile'] })
    },
  })
}

export default useDisapproveTutorVerification
