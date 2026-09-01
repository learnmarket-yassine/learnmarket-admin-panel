export type SparksOffer = {
  id: string
  name: string
  sparksAmount: number
  priceCents: number
  currency?: string
  displayOrder?: number
  isActive: boolean
  createdAt: string
}

export type SparksOffersSlice = {
  sparksOffers: {
    sparksOffers: SparksOffer[]
    setSparksOffers: (sparksOffers: SparksOffer[]) => void
  }
}
