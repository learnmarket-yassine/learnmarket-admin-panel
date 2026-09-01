import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useStore } from '@/store/store'
import { AxiosInstance } from 'axios'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'

export type SparksOfferPayloadData = {
  name: string
  sparksAmount: number
  priceCents: number
  currency?: string
  displayOrder?: number
}

const createSparksOffer = async (data: SparksOfferPayloadData, axiosPrivate: AxiosInstance) => {
  const response = await axiosPrivate.post('/admin/sparks-offers', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.data
}

const useCreateSparksOffer = () => {
  const queryClient = useQueryClient()

  const [modalState, setModalState] = useState<{
    isOpen: boolean
    type: 'success' | 'error'
    title: string
    description: string
  }>({
    isOpen: false,
    type: 'success',
    title: '',
    description: '',
  })

  const handleModal = (isOpen: boolean) => {
    setModalState((prev) => ({ ...prev, isOpen: isOpen }))
  }
  const axiosPrivate = useAxiosPrivate()
  const createSparksOfferMutation = useMutation({
    mutationFn: (data: SparksOfferPayloadData) => createSparksOffer(data, axiosPrivate),
    onSuccess: () => {
      setModalState({
        isOpen: true,
        type: 'success',
        title: 'Success',
        description: 'Sparks offer created successfully',
      })
      queryClient.invalidateQueries({ queryKey: ['sparksOffers'] })
    },
    onError: () => {
      setModalState({
        isOpen: true,
        type: 'error',
        title: 'Error',
        description: 'Failed to create Sparks offer',
      })
    },
  })

  const handleCreateSparksOffer = async (data: SparksOfferPayloadData) => {
    await createSparksOfferMutation.mutateAsync(data)
  }

  return {
    handleCreateSparksOffer,
    modalState,
    handleModal,
    isLoading: createSparksOfferMutation.isPending,
  }
}

export { useCreateSparksOffer }
