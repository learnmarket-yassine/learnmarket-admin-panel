import { StateCreator } from 'zustand'
import { TutorVerificationsSlice } from './types'

const initialState = {
  tutorVerifications: [],
}
export const tutorVerificationsSlice: StateCreator<TutorVerificationsSlice> = (set) => ({
  tutorVerifications: {
    ...initialState,
    setTutorVerifications: (tutorVerifications) =>
      set((state) => ({
        tutorVerifications: {
          ...state.tutorVerifications,
          tutorVerifications: tutorVerifications,
        },
      })),
  },
})
