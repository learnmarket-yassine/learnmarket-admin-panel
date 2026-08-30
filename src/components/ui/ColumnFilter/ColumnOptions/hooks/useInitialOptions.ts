import { useMemo } from 'react'
import { FilterOption } from '../types'
import { FilterType } from '@/features/users/store/types'
import { FILTER_OPTIONS } from '@/lib/Constants'

type UseInitialOptionsResult = {
  initialOptions: FilterOption[]
  isLoading: boolean
}

const useInitialOptions = (filterType: FilterType, optionName: string): UseInitialOptionsResult => {
  const initialOptions = useMemo<FilterOption[]>(
    () => FILTER_OPTIONS[filterType]?.[optionName] ?? [],
    [filterType, optionName]
  )

  return { initialOptions, isLoading: false }
}

export default useInitialOptions
