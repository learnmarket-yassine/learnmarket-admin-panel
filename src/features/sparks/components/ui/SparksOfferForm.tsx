import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { X } from 'lucide-react'
import Loader from '@/components/ui/Loader/Loader'
import { Button } from '@/components/ui/button'
import { CustomInput } from '@/components/ui/CustomInput'
import { Label } from '@/components/ui/label'
import { useStore } from '@/store/store'
import SuccessMessageModal from '@/components/layout/SuccessMessageModal'
import { createSparksOfferSchema } from '../../schema/schema'
import { useEditSparksOffer } from '../../hooks/useEditSparksOffer'
import { useCreateSparksOffer } from '../../hooks/useCreateSparksOffer'
import EditButton from '@/components/ui/EditButton'

type FormValues = z.infer<typeof createSparksOfferSchema>

type Props = {
  edit: boolean
  id?: string
  isLoading?: boolean
}

type SparksOfferToCreateType = {
  name: string
  sparksAmount: number
  priceCents: number
  currency?: string
  displayOrder?: number
}

export function SparksOfferForm(props: Readonly<Props>) {
  const [isOpen, setIsOpen] = useState(false)
  const sparksOffers = useStore((state) => state.sparksOffers.sparksOffers)

  const { handleCreateSparksOffer, modalState, handleModal, isLoading } = useCreateSparksOffer()
  const {
    handleEditSparksOffer,
    modalState: modalEditState,
    handleModal: handleEditModal,
    isLoading: isEditLoading,
  } = useEditSparksOffer()

  const form = useForm<FormValues>({
    resolver: zodResolver(createSparksOfferSchema),
  })

  const { register, handleSubmit, formState, reset } = form

  useEffect(() => {
    if (props.edit && props.id) {
      const sparksOfferToEdit = sparksOffers.find((sparksOffer) => sparksOffer.id === props.id)
      reset({
        name: sparksOfferToEdit?.name ?? '',
        sparksAmount: sparksOfferToEdit?.sparksAmount ?? 0,
        priceCents: sparksOfferToEdit?.priceCents ?? 0,
        currency: sparksOfferToEdit?.currency ?? '',
        displayOrder: sparksOfferToEdit?.displayOrder ?? 0,
      })
    } else reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.edit, isOpen, reset])

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const sparksOffer: SparksOfferToCreateType = {
      name: data.name,
      sparksAmount: data.sparksAmount,
      priceCents: data.priceCents,
      currency: data.currency,
      displayOrder: data.displayOrder,
    }

    if (props.edit) {
      await handleEditSparksOffer(props.id as string, sparksOffer).finally(() => {
        reset()
        setIsOpen(false)
      })
    } else {
      await handleCreateSparksOffer(sparksOffer).finally(() => {
        reset()
        setIsOpen(false)
      })
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {props.edit ? (
            <EditButton label="Edit Sparks Offer" />
          ) : (
            <Button
              type="button"
              className="h-full whitespace-nowrap bg-[#2563EB] px-6 py-3 font-medium text-white hover:bg-[#2563EB]"
              onClick={() => setIsOpen(true)}
            >
              Create Sparks Offer
            </Button>
          )}
        </DialogTrigger>
        <DialogContent
          className="w-[400px] sm:w-[425px] sm:min-w-[500px]"
          style={{
            boxShadow: '0px 0px 10px 0px rgba(255, 255, 255, 0.80)',
          }}
        >
          <DialogHeader>
            <DialogTitle className="mb-[20px] text-2xl font-[600] text-[#4C4C4C]">
              <div className="flex w-full items-center justify-between">
                <span className="text-2xl font-bold text-[#143681]">
                  {!props.edit ? 'Add a new Sparks Offer' : "Edit the Sparks Offer's information"}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false)
                  }}
                >
                  <X className="text-label size-4" />
                </button>
              </div>
            </DialogTitle>
          </DialogHeader>
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.stopPropagation()
              handleSubmit(onSubmit)(e)
            }}
            noValidate
          >
            <div className="grid grid-cols-4 items-center">
              <div className="text col-span-4">
                <Label htmlFor="name" className="text-label text-right text-base font-[600]">
                  Name<span className="text-required">*</span>
                </Label>
              </div>
              <div className="col-span-4">
                <CustomInput
                  id="name"
                  required={false}
                  placeholder="Name"
                  error={formState.errors.name?.message}
                  {...register('name')}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center">
              <div className="text col-span-4">
                <Label
                  htmlFor="sparks-amount"
                  className="text-label text-right text-base font-[600]"
                >
                  Sparks Amount<span className="text-required">*</span>
                </Label>
              </div>
              <div className="col-span-4">
                <CustomInput
                  id="sparks-amount"
                  type="number"
                  required={false}
                  placeholder="100"
                  error={formState.errors.sparksAmount?.message}
                  {...register('sparksAmount', { valueAsNumber: true })}
                />
              </div>
            </div>

            <div className="grid grid-cols-4 items-center">
              <div className="text col-span-4">
                <Label htmlFor="price-cents" className="text-label text-right text-base font-[600]">
                  Price (Cents)<span className="text-required">*</span>
                </Label>
              </div>
              <div className="col-span-4">
                <div className="flex items-center gap-2">
                  <CustomInput
                    id="price-cents"
                    type="number"
                    placeholder="0.00"
                    {...register('priceCents', { valueAsNumber: true })}
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="sm:justify-center">
              <Button
                type="button"
                className="h-full whitespace-nowrap px-6 py-3 font-medium"
                onClick={() => setIsOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                className="h-full whitespace-nowrap bg-[#2563EB] px-6 py-3 font-medium text-white hover:bg-[#2563EB]"
                type="submit"
                disabled={isLoading || isEditLoading}
              >
                {isLoading || isEditLoading ? (
                  <Loader fillColor="#FFFFFF" width="25" height="25" />
                ) : props.edit ? (
                  'Edit'
                ) : (
                  'Add'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <SuccessMessageModal
        name={!props.edit ? 'Add a new Sparks Offer' : "Edit the Sparks Offer's information"}
        title={!props.edit ? modalState.description : modalEditState.description}
        type="success"
        description={''}
        isOpen={!props.edit ? modalState.isOpen : modalEditState.isOpen}
        setIsOpen={!props.edit ? () => handleModal(true) : () => handleEditModal(true)}
        isLoading={!props.edit ? isLoading : isEditLoading}
        handleClose={!props.edit ? () => handleModal(false) : () => handleEditModal(false)}
        handleReturn={!props.edit ? () => handleModal(false) : () => handleEditModal(false)}
        titleButton={'OK'}
      />
    </>
  )
}

export default SparksOfferForm
