import { StateCreator } from 'zustand'
import { LearnRequestSlice } from './types'

const initialState = {
  formStep: 1,
  clickedLearnRequestName: '',
  searchWord: '',
}

export const learnRequestSlice: StateCreator<LearnRequestSlice> = (set) => ({
  learnRequest: {
    ...initialState,
    setClickedLearnRequestName: (learnRequestName) =>
      set((state) => ({
        learnRequest: {
          ...state.learnRequest,
          clickedLearnRequestName: learnRequestName,
        },
      })),
    setSearchWord: (searchWord) =>
      set((state) => ({
        learnRequest: {
          ...state.learnRequest,
          searchWord,
        },
      })),
    setFormStep: (step) =>
      set((state) => ({
        learnRequest: {
          ...state.learnRequest,
          formStep: step,
        },
      })),
    resetState: () =>
      set((state) => ({
        learnRequest: {
          ...state.learnRequest,
          ...initialState,
        },
      })),
  },
})
