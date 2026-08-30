import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { Category } from '../types'
import { useEffect, useState } from 'react'
import useUpdateCategory from '../hooks/useUpdateCategory'
import useCreateCategory from '../hooks/useCreateCategory'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CategoryFormValues, categorySchema } from '../schemas'
import { slugify } from '@/utils/slugify'
import ToastMessage from '@/components/layout/ToastMessage'
import { getApiErrorMessage, isConflictError } from '@/lib/api/errors'
import { CustomInput } from '@/components/ui/CustomInput'
import { Button } from '@/components/ui/button'
import Loader from '@/components/ui/Loader/Loader'

interface CategoryFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category?: Category
  categories: Category[]
}

const CategoryFormModal = ({
  open,
  onOpenChange,
  category,
  categories,
}: CategoryFormModalProps) => {
  const isEditing = !!category
  const [slugTouched, setSlugTouched] = useState(isEditing)
  const createCategory = useCreateCategory()
  const updateCategory = useUpdateCategory()
  const isPending = createCategory.isPending || updateCategory.isPending

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name ?? '',
      slug: category?.slug ?? '',
    },
  })
  const { register, handleSubmit, watch, setValue, setError, formState } = form
  const { errors } = formState
  const name = watch('name')

  useEffect(() => {
    if (!slugTouched) {
      setValue('slug', slugify(name || ''), { shouldValidate: false })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, slugTouched])

  const onSubmit = async (values: CategoryFormValues) => {
    if (isPending) return

    const name = values.name.trim()
    const slug = slugify(values.slug)

    const nameConflict = categories.find(
      (c) => c.id !== category?.id && c.name.toLowerCase() === name.toLowerCase()
    )
    if (nameConflict) {
      setError('name', { message: 'A category with this name already exists' })
      return
    }
    const slugConflict = categories.find((c) => c.id !== category?.id && c.slug === slug)
    if (slugConflict) {
      setError('slug', { message: 'A category with this slug already exists' })
      return
    }

    try {
      if (isEditing && category) {
        await updateCategory.mutateAsync({
          id: category.id,
          payload: { name, slug },
        })
        ToastMessage({ type: 'success', message: 'Category updated' })
      } else {
        await createCategory.mutateAsync({ name, slug })
        ToastMessage({ type: 'success', message: 'Category created' })
      }
      onOpenChange(false)
    } catch (error) {
      if (isConflictError(error)) {
        const message = getApiErrorMessage(error)
        setError(message.toLowerCase().includes('slug') ? 'slug' : 'name', { message })
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
            {isEditing ? 'Edit category' : 'New category'}
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

export default CategoryFormModal
