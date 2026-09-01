import { StateCreator } from 'zustand'
import { SparksOffersSlice } from './types'

const initialState = {
  sparksOffers: [],
}
export const sparksOffersSlice: StateCreator<SparksOffersSlice> = (set) => ({
  sparksOffers: {
    ...initialState,
    setSparksOffers: (sparksOffers) =>
      set((state) => ({
        sparksOffers: {
          ...state.sparksOffers,
          sparksOffers: sparksOffers,
        },
      })),
  },
})
