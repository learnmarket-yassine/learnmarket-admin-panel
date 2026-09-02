import { useQuery } from '@tanstack/react-query'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'

export type PlatformSettings = {
  proposalSparksCost: number
  serviceFeePercent: number
}

const useGetPlatformSettings = () => {
  const axiosPrivate = useAxiosPrivate()

  return useQuery({
    queryKey: ['platformSettings'],
    queryFn: async (): Promise<PlatformSettings> => {
      const response = await axiosPrivate.get(`/admin/platform-settings`)
      return response.data
    },
  })
}

export default useGetPlatformSettings
