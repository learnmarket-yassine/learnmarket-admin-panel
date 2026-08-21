import { StateCreator } from 'zustand'
import { AuthSlice } from './types'

export const authSlice: StateCreator<AuthSlice> = (set) => ({
  auth: {
    authenticationResult: null,
    setAuthenticationResult: (auth) =>
      set((state) => ({
        auth: {
          ...state.auth,
          authenticationResult: auth,
        },
      })),
    user: null,
    setUser: (user) =>
      set((state) => ({
        auth: {
          ...state.auth,
          user: user,
        },
      })),
    clickedLearnRequestName: '',
    setClickedLearnRequestName: (learnRequestName) =>
      set((state) => ({
        auth: {
          ...state.auth,
          clickedLearnRequestName: learnRequestName,
        },
      })),
  },
})
