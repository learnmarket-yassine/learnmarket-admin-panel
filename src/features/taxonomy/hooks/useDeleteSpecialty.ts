import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosInstance } from 'axios'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { CATEGORIES_QUERY_KEY } from './useGetCategories'

export interface DeleteSpecialtyVariables {
  id: string
  categoryId: string
}

const deleteSpecialty = async (
  axiosPrivate: AxiosInstance,
  { id }: DeleteSpecialtyVariables
): Promise<void> => {
  await axiosPrivate.delete(`/admin/specialties/${id}/hard`)
}

const useDeleteSpecialty = () => {
  const axiosPrivate = useAxiosPrivate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (variables: DeleteSpecialtyVariables) => deleteSpecialty(axiosPrivate, variables),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin-specialties', variables.categoryId] })
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY })
    },
  })
}

export default useDeleteSpecialty
