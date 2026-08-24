import { Announcement } from '@/features/learn-request/store/types'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { useQuery } from '@tanstack/react-query'
import { AxiosInstance } from 'axios'

const getSessionAnnouncements = async (
  api: AxiosInstance,
  sessionId: string
): Promise<Announcement[]> => {
  const response = await api.get(`/sessions/${sessionId}/announcements`)
  return response.data
}

export default function useGetSessionAnnouncements(sessionId: string) {
  const axiosPrivate = useAxiosPrivate()

  return useQuery({
    queryKey: ['session', sessionId, 'announcements'],
    queryFn: () => getSessionAnnouncements(axiosPrivate, sessionId),
    enabled: !!sessionId,
  })
}
