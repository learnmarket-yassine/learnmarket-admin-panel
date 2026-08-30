import { FilterType } from '@/features/users/store/types'

export const customFilters: Record<
  FilterType,
  {
    filters: {
      [optionName: string]: (value: string) => string
    }
  }
> = {
  user: { filters: {} },
}

export const customOrders: Record<
  FilterType,
  {
    filters: {
      [optionName: string]: (value: string) => string
    }
  }
> = {
  user: { filters: {} },
}
