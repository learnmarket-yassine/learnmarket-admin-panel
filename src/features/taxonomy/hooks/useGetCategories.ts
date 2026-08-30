import { useQuery } from '@tanstack/react-query'
import { AxiosInstance } from 'axios'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { Category } from '../types'

export const CATEGORIES_QUERY_KEY = ['admin-categories']

const fetchCategories = async (axiosPrivate: AxiosInstance): Promise<Category[]> => {
  const res = await axiosPrivate.get('/admin/categories')
  return res.data as Category[]
}

const useGetCategories = () => {
  const axiosPrivate = useAxiosPrivate()

  return useQuery({
    queryKey: CATEGORIES_QUERY_KEY,
    queryFn: () => fetchCategories(axiosPrivate),
  })
}

export default useGetCategories
