import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { AxiosInstance } from 'axios'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'

const deleteSparksOffer = async (id: string, axiosPrivate: AxiosInstance) => {
  const response = await axiosPrivate.patch(`/admin/sparks-offers/${id}/deactivate`)
  return response.data
}

const useDeleteSparksOffer = () => {
  const queryClient = useQueryClient()
  const [deleteModalState, setDeleteModalState] = useState<{
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

  const handleCloseDeleteModal = () => {
    setDeleteModalState((prev) => ({ ...prev, isOpen: false }))
  }
  const axiosPrivate = useAxiosPrivate()
  const deleteSparksOfferMutation = useMutation({
    mutationFn: (id: string) => deleteSparksOffer(id, axiosPrivate),
    onSuccess: () => {
      setDeleteModalState({
        isOpen: true,
        type: 'success',
        title: 'Success',
        description: 'the Sparks Offer has been successfully deleted.',
      })
      queryClient.invalidateQueries({ queryKey: ['sparksOffers'] })
    },
    onError: () => {
      const errorMessage = 'An error occurred while deleting the Sparks Offer. Please try again.'
      setDeleteModalState({
        isOpen: true,
        type: 'error',
        title: 'Error',
        description: errorMessage,
      })
    },
  })

  const handleDeleteSparksOffer = async (id: string) => {
    await deleteSparksOfferMutation.mutateAsync(id)
  }

  return {
    handleDeleteSparksOffer,
    deleteModalState,
    handleCloseDeleteModal,
    isPending: deleteSparksOfferMutation.isPending,
  }
}

export default useDeleteSparksOffer
