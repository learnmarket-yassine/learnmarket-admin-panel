import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosInstance } from 'axios'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { Category } from '../types'
import { CATEGORIES_QUERY_KEY } from './useGetCategories'

export interface CreateCategoryPayload {
  name: string
  slug: string
}

const createCategory = async (
  axiosPrivate: AxiosInstance,
  payload: CreateCategoryPayload
): Promise<Category> => {
  const res = await axiosPrivate.post('/admin/categories', payload)
  return res.data as Category
}

const useCreateCategory = () => {
  const axiosPrivate = useAxiosPrivate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateCategoryPayload) => createCategory(axiosPrivate, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY })
    },
  })
}

export default useCreateCategory
