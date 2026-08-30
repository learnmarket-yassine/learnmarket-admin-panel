import { useState } from 'react'
import ToastMessage from '@/components/layout/ToastMessage'
import { getApiErrorMessage } from '@/lib/api/errors'
import useUpdateCategory from '../hooks/useUpdateCategory'
import { Category } from '../types'
import CategoryFormModal from './CategoryFormModal'
import SpecialtiesCard from './SpecialtiesCard'
import CategorySkillsCard from './CategorySkillsCard'
import EditButton from '@/components/ui/EditButton'
import ConfirmModal from '@/components/layout/ConfirmModal'

interface CategoryDetailPanelProps {
  category: Category
  categories: Category[]
}

const CategoryDetailPanel = ({ category, categories }: CategoryDetailPanelProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const updateCategory = useUpdateCategory()
  const specialtyCount = category._count.specialties

  const handleDeactivate = async () => {
    try {
      await updateCategory.mutateAsync({ id: category.id, payload: { isActive: false } })
      ToastMessage({ type: 'success', message: 'Category deactivated' })
      setIsDeleteOpen(false)
    } catch (error) {
      ToastMessage({ type: 'error', message: getApiErrorMessage(error) })
    }
  }

  return (
    <div className="flex h-full flex-1 flex-col gap-4 overflow-y-auto p-4">
      <div className="flex items-start justify-between gap-3 rounded-lg border-[0.5px] border-[#9a9dad] p-4">
        <h1 className="truncate text-lg font-semibold">{category.name}</h1>
        <div className="flex shrink-0 items-center gap-1">
          <EditButton label={`Edit ${category.name}`} onClick={() => setIsEditOpen(true)} />
          <ConfirmModal
            name="category"
            type="delete"
            title={'Delete Category'}
            description={`Deleting this category permanently will also delete its ${specialtyCount} specialt${specialtyCount === 1 ? 'y' : 'ies'} and remove all skill links for this category. This cannot be undone.`}

            handleConfirm={async () => {
              await handleDeactivate()
            }}
            buttonClassName="border-none"
            isLoading={updateCategory.isPending}
            isOpen={isDeleteOpen}
            setIsOpen={(open) => setIsDeleteOpen(!!open)}
          />
        </div>
      </div>

      <SpecialtiesCard categoryId={category.id} />

      <CategorySkillsCard categoryId={category.id} />

      <CategoryFormModal
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        category={category}
        categories={categories}
      />
    </div>
  )
}

export default CategoryDetailPanel
