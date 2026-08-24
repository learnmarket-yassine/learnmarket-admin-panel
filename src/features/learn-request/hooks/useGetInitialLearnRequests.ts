import { useQuery } from '@tanstack/react-query'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { LearnRequest } from '../store/types'

export interface learnRequestsResponse {
  paginatedResult: LearnRequest[]
  totalCount: number
}

const useGetInitialLearnRequests = () => {
  const axiosPrivate = useAxiosPrivate()

  return useQuery({
    queryKey: ['initialLearnRequests'],
    queryFn: async (): Promise<learnRequestsResponse> => {
      const response = await axiosPrivate.get('/learn-requests?page=0&take=6')
      return response.data
    },
    staleTime: Infinity,
    refetchOnMount: false,
  })
}

export default useGetInitialLearnRequests
