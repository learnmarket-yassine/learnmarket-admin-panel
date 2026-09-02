import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosInstance } from 'axios'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'

const editPlatformSettings = async (
  payload: { proposalSparksCost?: number; serviceFeePercent?: number },
  axiosPrivate: AxiosInstance
) => {
  const response = await axiosPrivate.patch(`/admin/platform-settings`, payload)
  return response.data
}

const useEditPlatformSettings = () => {
  const queryClient = useQueryClient()

  const axiosPrivate = useAxiosPrivate()
  const editPlatformSettingsMutation = useMutation({
    mutationFn: (payload: { proposalSparksCost?: number; serviceFeePercent?: number }) =>
      editPlatformSettings(payload, axiosPrivate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['platformSettings'] })
    },
    onError: () => {},
  })

  const handleEditPlatformSettings = async (platformSettings: {
    proposalSparksCost?: number
    serviceFeePercent?: number
  }) => {
    await editPlatformSettingsMutation.mutateAsync(platformSettings)
  }

  return {
    handleEditPlatformSettings,
    isLoading: editPlatformSettingsMutation.isPending,
  }
}

export { useEditPlatformSettings }
