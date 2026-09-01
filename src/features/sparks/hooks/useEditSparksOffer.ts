import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useStore } from '@/store/store'
import { AxiosInstance } from 'axios'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'

export type SparksOfferToEdit = {
  id?: string
  name?: string
  sparksAmount?: number
  priceCents?: number
  currency?: string
  displayOrder?: number
}

const editSparksOffer = async (
  payload: { id: string; sparksOffer: SparksOfferToEdit },
  axiosPrivate: AxiosInstance
) => {
  const response = await axiosPrivate.patch(
    `/admin/sparks-offers/${payload.id}`,
    payload.sparksOffer
  )
  return response.data
}

const useEditSparksOffer = () => {
  const queryClient = useQueryClient()
  const setSparksOffers = useStore((state) => state.sparksOffers.setSparksOffers)
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
  const editSparksOfferMutation = useMutation({
    mutationFn: (payload: { id: string; sparksOffer: SparksOfferToEdit }) =>
      editSparksOffer(payload, axiosPrivate),
    onSuccess: () => {
      setModalState({
        isOpen: true,
        type: 'success',
        title: 'Success',
        description: 'Sparks offer updated successfully',
      })
      queryClient.invalidateQueries({ queryKey: ['sparksOffers'] })
    },
    onError: () => {
      setModalState({
        isOpen: true,
        type: 'error',
        title: 'Error',
        description: 'Failed to update sparks offer',
      })
    },
  })

  const handleEditSparksOffer = async (id: string, sparksOffer: SparksOfferToEdit) => {
    await editSparksOfferMutation.mutateAsync({ id, sparksOffer })
  }

  return {
    handleEditSparksOffer,
    modalState,
    handleModal,
    isLoading: editSparksOfferMutation.isPending,
  }
}

export { useEditSparksOffer }
