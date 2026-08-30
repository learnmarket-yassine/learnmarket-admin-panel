import { useState } from 'react'
import Loader from '@/components/ui/Loader/Loader'
import EmptyState from '@/components/ui/EmptyState'
import CategoryListPane from '@/features/taxonomy/components/CategoryListPane'
import CategoryDetailPanel from '@/features/taxonomy/components/CategoryDetailPanel'
import CategoryFormModal from '@/features/taxonomy/components/CategoryFormModal'
import useGetCategories from '@/features/taxonomy/hooks/useGetCategories'
import BackButton from '@/components/ui/BackButton'

const TaxonomyPage = () => {
  const categoriesQuery = useGetCategories()
  const categories = categoriesQuery.data ?? []

  const [selectedId, setSelectedId] = useState<string | undefined>()
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const selectedCategory = categories.find((c) => c.id === selectedId) ?? categories[0]

  if (categoriesQuery.isLoading) {
    return <Loader className="flex h-full w-full items-center justify-center" />
  }

  return (
    <div className="relative h-full w-full space-y-4 bg-white p-2">
      <div className="space-y-3">
        <BackButton text={'Back'} className="text-xl text-primary" route={`/learn-requests`} />
        <p>
          Here you can manage the platform taxonomy by viewing categories and their related
          specialties and skills. You can manage categories, specialties, and skill assignments to
          keep the taxonomy organized and up to date.
        </p>
      </div>
      <div className="min-w-0">
        <div className="flex h-full w-full overflow-hidden bg-white">
          <CategoryListPane
            categories={categories}
            selectedId={selectedCategory?.id}
            onSelect={setSelectedId}
            onCreate={() => setIsCreateOpen(true)}
          />

          {selectedCategory ? (
            <CategoryDetailPanel
              key={selectedCategory.id}
              category={selectedCategory}
              categories={categories}
            />
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <EmptyState message="Create a category to get started." />
            </div>
          )}

          <CategoryFormModal
            open={isCreateOpen}
            onOpenChange={setIsCreateOpen}
            categories={categories}
          />
        </div>
      </div>
    </div>
  )
}

export default TaxonomyPage
