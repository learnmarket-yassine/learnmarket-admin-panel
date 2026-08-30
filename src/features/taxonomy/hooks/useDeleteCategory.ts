import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosInstance } from 'axios'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { CATEGORIES_QUERY_KEY } from './useGetCategories'

const deleteCategory = async (axiosPrivate: AxiosInstance, id: string): Promise<void> => {
  await axiosPrivate.delete(`/admin/categories/${id}/hard`)
}

const useDeleteCategory = () => {
  const axiosPrivate = useAxiosPrivate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteCategory(axiosPrivate, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY })
    },
  })
}

export default useDeleteCategory
