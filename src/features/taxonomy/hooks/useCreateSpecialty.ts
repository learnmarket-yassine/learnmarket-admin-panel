import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosInstance } from 'axios'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { Specialty } from '../types'
import { CATEGORIES_QUERY_KEY } from './useGetCategories'

export interface CreateSpecialtyPayload {
  categoryId: string
  name: string
  slug: string
}

const createSpecialty = async (
  axiosPrivate: AxiosInstance,
  payload: CreateSpecialtyPayload
): Promise<Specialty> => {
  const res = await axiosPrivate.post('/admin/specialties', payload)
  return res.data as Specialty
}

const useCreateSpecialty = () => {
  const axiosPrivate = useAxiosPrivate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateSpecialtyPayload) => createSpecialty(axiosPrivate, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin-specialties', variables.categoryId] })
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY })
    },
  })
}

export default useCreateSpecialty
