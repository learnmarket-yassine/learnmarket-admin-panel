import { StateCreator } from 'zustand'
import { LearnRequestSlice } from './types'

export const learnRequestSlice: StateCreator<LearnRequestSlice> = (set) => ({
  learnRequest: {
    clickedLearnRequestName: '',
    setClickedLearnRequestName: (learnRequestName) =>
      set((state) => ({
        learnRequest: {
          ...state.learnRequest,
          clickedLearnRequestName: learnRequestName,
        },
      })),
    searchWord: '',
    setSearchWord: (searchWord) =>
      set((state) => ({
        learnRequest: {
          ...state.learnRequest,
          searchWord,
        },
      })),
    formStep: 1,
    setFormStep: (step) =>
      set((state) => ({
        learnRequest: {
          ...state.learnRequest,
          formStep: step,
        },
      })),
  },
})
