import { Category } from '../types'
import AddButton from '@/components/ui/AddButton'

interface CategoryListPaneProps {
  categories: Category[]
  selectedId: string | undefined
  onSelect: (id: string) => void
  onCreate: () => void
}

const CategoryListPane = ({
  categories,
  selectedId,
  onSelect,
  onCreate,
}: CategoryListPaneProps) => {
  return (
    <div className="flex h-full w-full max-w-xs flex-col">
      <div className="flex items-center justify-between p-3">
        <h2 className="text-xl font-semibold text-[#143681]">Categories</h2>
        <AddButton label="create category" onClick={onCreate} />
      </div>

      <ul className="flex-1 space-y-3 overflow-y-auto p-3">
        {categories.map((category) => {
          const isSelected = category.id === selectedId
          return (
            <li key={category.id}>
              <button
                type="button"
                aria-current={isSelected ? 'true' : undefined}
                onClick={() => onSelect(category.id)}
                className={`flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm font-medium transition-colors hover:text-[#2563EB] ${
                  isSelected ? 'text-[#2563EB]' : 'text-[#4B5563]'
                }`}
              >
                <span className="truncate">{category.name}</span>
              </button>
            </li>
          )
        })}
        {categories.length === 0 && (
          <li className="p-4 text-center text-sm text-muted-foreground">No categories yet.</li>
        )}
      </ul>
    </div>
  )
}

export default CategoryListPane
