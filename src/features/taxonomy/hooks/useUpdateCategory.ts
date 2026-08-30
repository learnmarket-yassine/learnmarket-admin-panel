import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosInstance } from 'axios'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { Category } from '../types'
import { CATEGORIES_QUERY_KEY } from './useGetCategories'

export interface UpdateCategoryPayload {
  name?: string
  slug?: string
  isActive?: boolean
}

export interface UpdateCategoryVariables {
  id: string
  payload: UpdateCategoryPayload
}

const updateCategory = async (
  axiosPrivate: AxiosInstance,
  { id, payload }: UpdateCategoryVariables
): Promise<Category> => {
  const res = await axiosPrivate.patch(`/admin/categories/${id}`, payload)
  return res.data as Category
}

const useUpdateCategory = () => {
  const axiosPrivate = useAxiosPrivate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (variables: UpdateCategoryVariables) => updateCategory(axiosPrivate, variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY })
    },
  })
}

export default useUpdateCategory
