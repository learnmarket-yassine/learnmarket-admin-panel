import { StateCreator } from 'zustand'
import { TableFilter, TableFilters, UsersSlice } from './types'

const initialState = {
  filters: {
    where: null,
    orderBy: null,
  },
  searchFilter: '',
  users: [],
  userFilters: [],
  tableFilters: {
    user: [],
    tutorVerifications: [],
  },
}
export const usersSlice: StateCreator<UsersSlice> = (set) => ({
  users: {
    ...initialState,
    resetState: () =>
      set((state) => ({
        users: {
          ...state.users,
          ...initialState,
        },
      })),
    setFilters: (appliedOn, type, key, value) =>
      set((state) => {
        const updatedFilters = { ...state.users.filters }

        if (type === 'where') {
          updatedFilters.where = {
            ...(state.users.filters.where ?? {}),
            [appliedOn]: {
              AND: {
                ...state.users.filters.where?.[appliedOn]?.AND,
                [key]: value,
              },
            },
          }
        } else if (type === 'orderBy') {
          updatedFilters.orderBy = {
            ...(state.users.filters.orderBy || {}),
            [appliedOn]: {
              ...state.users.filters.orderBy?.[appliedOn],
              [key]: value,
            },
          }
        }

        return {
          users: {
            ...state.users,
            filters: updatedFilters,
          },
        }
      }),
    resetFilter: () =>
      set((state) => ({
        users: {
          ...state.users,
          filters: {
            where: null,
            orderBy: null,
          },
        },
      })),
    setSearchFilter: (value) =>
      set((state) => ({ users: { ...state.users, searchFilter: value } })),
    setUsers: (users) =>
      set((state) => ({
        users: {
          ...state.users,
          users: users,
        },
      })),
    //FILTERS----------------------------------------------------------------
    setTableFilters: (table: keyof TableFilters, filters: TableFilter[]) =>
      set((state) => ({
        users: {
          ...state.users,
          tableFilters: {
            ...state.users.tableFilters,
            [table]: filters,
          },
        },
      })),
  },
})
