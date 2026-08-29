import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { useQuery } from '@tanstack/react-query'
import { AxiosInstance } from 'axios'
import { DisputedSession } from '../store/types'

type GetSessionsDisputedResponse = {
  paginatedResult: DisputedSession[]
  totalCount: number
}

type GetSessionsDisputedParams = {
  page: number
  take: number
}

export const DISPUTED_SESSIONS_PAGE_SIZE = 5

const getSessionsDisputed = async (
  api: AxiosInstance,
  params: GetSessionsDisputedParams
): Promise<GetSessionsDisputedResponse> => {
  const response = await api.get(`/admin/session-disputes`, { params })
  return response.data
}

export default function useGetSessionsDisputed(params: GetSessionsDisputedParams) {
  const axiosPrivate = useAxiosPrivate()

  return useQuery({
    queryKey: ['sessions-disputed', params],
    queryFn: () => getSessionsDisputed(axiosPrivate, params),
    placeholderData: (previousData) => previousData,
  })
}
