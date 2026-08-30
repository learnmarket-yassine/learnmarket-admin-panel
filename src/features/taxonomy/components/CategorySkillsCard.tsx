import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Loader from '@/components/ui/Loader/Loader'
import useGetCategorySkills from '../hooks/useGetCategorySkills'
import AssignSkillsModal from './AssignSkillsModal'
import SkillChip from '@/features/learn-request/components/ui/SkillChip'

interface CategorySkillsCardProps {
  categoryId: string
}

const CategorySkillsCard = ({ categoryId }: CategorySkillsCardProps) => {
  const [isAssignOpen, setIsAssignOpen] = useState(false)
  const categorySkillsQuery = useGetCategorySkills(categoryId)
  const skills = categorySkillsQuery.data ?? []

  return (
    <div className="rounded-lg border-[0.5px] border-[#9a9dad]">
      <div className="flex items-center justify-between gap-3 p-3">
        <h3 className="text-xl font-semibold text-[#143681]">Skills in this category</h3>
        <Button type="button" size="sm" onClick={() => setIsAssignOpen(true)}>
          <Plus className="size-4" data-icon="inline-start" />
          Assign
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 p-3">
        {categorySkillsQuery.isLoading ? (
          <div className="flex w-full justify-center py-4">
            <Loader width="24" height="24" />
          </div>
        ) : skills.length === 0 ? (
          <p className="py-2 text-sm text-muted-foreground">No skills linked yet.</p>
        ) : (
          skills.map((skill) => <SkillChip key={skill.id} name={skill.name} />)
        )}
      </div>

      <AssignSkillsModal
        open={isAssignOpen}
        onOpenChange={setIsAssignOpen}
        categoryId={categoryId}
        linkedSkills={skills}
      />
    </div>
  )
}

export default CategorySkillsCard
