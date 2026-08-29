import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import ToastMessage from '@/components/layout/ToastMessage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosInstance } from 'axios'
import { DisputeOutcome } from '../store/types'

type ResolveDisputeVariables = {
  sessionId: string
  outcome: DisputeOutcome
  note: string
}

const resolveDispute = async (
  api: AxiosInstance,
  { sessionId, outcome, note }: ResolveDisputeVariables
) => {
  const action = outcome === 'RELEASED' ? 'release' : 'refund'
  const response = await api.post(`/admin/session-disputes/${sessionId}/${action}`, { note })
  return response.data
}

export default function useResolveDispute() {
  const axiosPrivate = useAxiosPrivate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (variables: ResolveDisputeVariables) => resolveDispute(axiosPrivate, variables),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['session', variables.sessionId, 'context'],
      })
      queryClient.invalidateQueries({
        queryKey: ['sessions-disputed'],
      })
    },
    onError: () => {
      ToastMessage({ type: 'error', message: 'Could not resolve this dispute. Please try again.' })
    },
  })
}
