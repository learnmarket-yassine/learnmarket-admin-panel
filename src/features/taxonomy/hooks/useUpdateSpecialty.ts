import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosInstance } from 'axios'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { Specialty } from '../types'

export interface UpdateSpecialtyPayload {
  name?: string
  slug?: string
  isActive?: boolean
}

export interface UpdateSpecialtyVariables {
  id: string
  categoryId: string
  payload: UpdateSpecialtyPayload
}

const updateSpecialty = async (
  axiosPrivate: AxiosInstance,
  { id, payload }: UpdateSpecialtyVariables
): Promise<Specialty> => {
  const res = await axiosPrivate.patch(`/admin/specialties/${id}`, payload)
  return res.data as Specialty
}

const useUpdateSpecialty = () => {
  const axiosPrivate = useAxiosPrivate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (variables: UpdateSpecialtyVariables) => updateSpecialty(axiosPrivate, variables),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin-specialties', variables.categoryId] })
    },
  })
}

export default useUpdateSpecialty
