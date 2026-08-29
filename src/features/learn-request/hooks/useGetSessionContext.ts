import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { useQuery } from '@tanstack/react-query'
import { AxiosInstance } from 'axios'
import { SessionStatus } from '../components/ui/SessionBoardRow'
import { DisputedAmount } from '@/features/session/store/types'

export type BookingStatus = 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'

export interface SessionContext {
  id: string
  title: string
  objective: string | null
  status: SessionStatus
  isTutor: boolean
  tutor: { firstname: string; lastname: string; avatar: string | null; id: string }
  learner: { firstname: string; lastname: string; avatar: string | null; id: string }
  tutorJoinedAt: string | null
  learnerJoinedAt: string | null
  summary: string | null
  summarySubmittedAt: string | null
  learnerConfirmedAt: string | null
  dispute: {
    reason: string
    raisedAt: string
  } | null
  disputedAmount: DisputedAmount
  booking: { id: string; status: BookingStatus; startTime: string; endTime: string } | null
}

const getSessionContext = async (
  api: AxiosInstance,
  sessionId: string
): Promise<SessionContext> => {
  const response = await api.get(`/sessions/${sessionId}`)
  return response.data
}

export default function useGetSessionContext(sessionId?: string, enabled = true) {
  const axiosPrivate = useAxiosPrivate()

  return useQuery({
    queryKey: ['session', sessionId, 'context'],
    queryFn: () => getSessionContext(axiosPrivate, sessionId!),
    enabled: !!sessionId && enabled,
  })
}
