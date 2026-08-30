import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import SearchInput from '@/components/ui/SearchInput'
import Loader from '@/components/ui/Loader/Loader'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import ToastMessage from '@/components/layout/ToastMessage'
import { getApiErrorMessage } from '@/lib/api/errors'
import useDebounce from '@/hooks/useDebounce'
import useGetSkills, { SKILLS_PAGE_SIZE } from '@/features/skills/hooks/useGetSkills'
import useUpdateCategorySkills from '../hooks/useUpdateCategorySkills'
import { Skill } from '../types'
import SkillCheckboxOption from './SkillCheckboxOption'
import LearnRequestPagination from '@/features/learn-request/components/ui/LearnRequestPagination'

interface AssignSkillsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  categoryId: string
  linkedSkills: Skill[]
}

const AssignSkillsModal = ({
  open,
  onOpenChange,
  categoryId,
  linkedSkills,
}: AssignSkillsModalProps) => {
  const [initialIds, setInitialIds] = useState<Set<string>>(new Set())
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set())
  const [page, setPage] = useState(0)
  const [searchInput, setSearchInput] = useState('')
  const search = useDebounce(searchInput)

  const skillsQuery = useGetSkills(page, search)
  const updateCategorySkills = useUpdateCategorySkills()

  const skills = skillsQuery.data?.data ?? []
  const total = skillsQuery.data?.total ?? 0

  const toggle = (skillId: string) => {
    setCheckedIds((prev) => {
      const next = new Set(prev)
      if (next.has(skillId)) {
        next.delete(skillId)
      } else {
        next.add(skillId)
      }
      return next
    })
  }

  useEffect(() => {
    if (!open) return
    const ids = new Set(linkedSkills.map((skill) => skill.id))
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInitialIds(ids)
    setCheckedIds(new Set(ids))
  }, [open, categoryId, linkedSkills])

  const handleSave = async () => {
    const toAdd = [...checkedIds].filter((id) => !initialIds.has(id))
    const toRemove = [...initialIds].filter((id) => !checkedIds.has(id))

    if (toAdd.length === 0 && toRemove.length === 0) {
      onOpenChange(false)
      return
    }

    try {
      await updateCategorySkills.mutateAsync({ categoryId, toAdd, toRemove })
      ToastMessage({ type: 'success', message: 'Skill assignments updated' })
      onOpenChange(false)
    } catch (error) {
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
          <DialogTitle className="text-2xl font-bold text-[#143681]">Assign skills</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 py-2">
          <SearchInput
            value={searchInput}
            onChange={(value) => {
              setSearchInput(value)
              setPage(1)
            }}
            onClear={() => {
              setSearchInput('')
              setPage(1)
            }}
            placeholder="Search skills..."
          />

          <span className="text-xs text-muted-foreground">{checkedIds.size} selected</span>

          {skillsQuery.isLoading ? (
            <div className="flex justify-center py-6">
              <Loader width="28" height="28" />
            </div>
          ) : (
            <ul className="max-h-72 overflow-y-auto">
              {skills.map((skill) => (
                <SkillCheckboxOption
                  key={skill.id}
                  skill={skill}
                  checked={checkedIds.has(skill.id)}
                  onToggle={() => toggle(skill.id)}
                />
              ))}
              {skills.length === 0 && (
                <li className="px-3 py-4 text-center text-sm text-muted-foreground">
                  No active skills found.
                </li>
              )}
            </ul>
          )}

          <div className="mt-2 flex items-center justify-center">
            <LearnRequestPagination
              currentPage={page}
              totalCount={total}
              take={SKILLS_PAGE_SIZE}
              onPageChange={setPage}
            />
          </div>
        </div>
        <DialogFooter className="!justify-end">
          <Button
            type="button"
            className="h-full whitespace-nowrap px-6 py-3 font-medium"
            onClick={() => onOpenChange(false)}
            disabled={updateCategorySkills.isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="h-full whitespace-nowrap bg-[#2563EB] px-6 py-3 font-medium text-white hover:bg-[#2563EB]"
            onClick={handleSave}
            disabled={updateCategorySkills.isPending}
          >
            {updateCategorySkills.isPending ? (
              <Loader fillColor="#FFFFFF" width="18" height="18" />
            ) : (
              'Save'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
export default AssignSkillsModal
