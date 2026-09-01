import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { CustomInput } from '@/components/ui/CustomInput'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import Loader from '@/components/ui/Loader/Loader'
import ToastMessage from '@/components/layout/ToastMessage'
import { getApiErrorMessage, isConflictError } from '@/lib/api/errors'
import { slugify } from '@/utils/slugify'
import { specialtySchema, SpecialtyFormValues } from '../schemas'
import { Specialty } from '../types'
import useCreateSpecialty from '../hooks/useCreateSpecialty'
import useUpdateSpecialty from '../hooks/useUpdateSpecialty'

interface SpecialtyFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  categoryId: string
  specialty?: Specialty
  existingSpecialties: Specialty[]
}

const SpecialtyFormModal = ({
  open,
  onOpenChange,
  categoryId,
  specialty,
  existingSpecialties,
}: SpecialtyFormModalProps) => {
  const isEditing = !!specialty
  const [slugTouched, setSlugTouched] = useState(isEditing)
  const createSpecialty = useCreateSpecialty()
  const updateSpecialty = useUpdateSpecialty()
  const isPending = createSpecialty.isPending || updateSpecialty.isPending

  const form = useForm<SpecialtyFormValues>({
    resolver: zodResolver(specialtySchema),
    defaultValues: {
      name: '',
      slug: '',
    },
  })
  const { register, handleSubmit, watch, setValue, setError, formState, reset } = form
  const { errors } = formState
  const name = watch('name')

  useEffect(() => {
    if (!slugTouched) {
      setValue('slug', slugify(name || ''), { shouldValidate: false })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, slugTouched])

  useEffect(() => {
    if (specialty) {
      reset({
        name: specialty.name,
        slug: specialty.slug,
      })

      setSlugTouched(true)
    } else {
      reset({
        name: '',
        slug: '',
      })

      setSlugTouched(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [specialty])

  const onSubmit = async (values: SpecialtyFormValues) => {
    if (isPending) return

    const name = values.name.trim()
    const slug = slugify(values.slug)

    const slugConflict = existingSpecialties.find((s) => s.id !== specialty?.id && s.slug === slug)
    if (slugConflict) {
      setError('slug', { message: 'A specialty with this slug already exists in this category' })
      return
    }

    try {
      if (isEditing) {
        await updateSpecialty.mutateAsync({
          id: specialty.id,
          categoryId,
          payload: { name, slug },
        })
        ToastMessage({ type: 'success', message: 'Specialty updated' })
      } else {
        await createSpecialty.mutateAsync({ categoryId, name, slug })
        ToastMessage({ type: 'success', message: 'Specialty created' })
        setValue('name', '')
        setValue('slug', '')
      }
      onOpenChange(false)
    } catch (error) {
      if (isConflictError(error)) {
        setError('slug', { message: getApiErrorMessage(error) })
        return
      }
      ToastMessage({ type: 'error', message: getApiErrorMessage(error) })
    }
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex w-[400px] flex-col space-y-6 sm:w-[425px] sm:min-w-[600px]"
        style={{
          boxShadow: '0px 0px 10px 0px rgba(255, 255, 255, 0.80)',
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#143681]">
            {isEditing ? 'Edit specialty' : 'New specialty'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
          <div className="flex flex-col gap-4">
            <CustomInput
              label="Name"
              required
              width="w-full"
              className="border border-[#6B7280] bg-white"
              error={errors.name?.message}
              {...register('name')}
            />
            <CustomInput
              label="Slug"
              required
              width="w-full"
              className="border border-[#6B7280] bg-white"
              error={errors.slug?.message}
              {...register('slug', {
                onChange: () => setSlugTouched(true),
              })}
            />
          </div>

          <DialogFooter className="!justify-end">
            <Button
              type="button"
              className="h-full whitespace-nowrap px-6 py-3 font-medium"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-full whitespace-nowrap bg-[#2563EB] px-6 py-3 font-medium text-white hover:bg-[#2563EB]"
              disabled={isPending}
            >
              {isPending ? <Loader fillColor="#FFFFFF" width="18" height="18" /> : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default SpecialtyFormModal
