import { useState } from 'react'
import SearchInput from '@/components/ui/SearchInput'
import Loader from '@/components/ui/Loader/Loader'
import ToastMessage from '@/components/layout/ToastMessage'
import { getApiErrorMessage } from '@/lib/api/errors'
import useDebounce from '@/hooks/useDebounce'
import useGetSkills, { SKILLS_PAGE_SIZE } from '@/features/skills/hooks/useGetSkills'
import useUpdateSkill from '@/features/skills/hooks/useUpdateSkill'
import { SkillWithCounts } from '@/features/skills/types'
import SkillFormModal from '@/features/skills/components/SkillFormModal'
import AddButton from '@/components/ui/AddButton'
import EditButton from '@/components/ui/EditButton'
import LearnRequestPagination from '@/features/learn-request/components/ui/LearnRequestPagination'
import BackButton from '@/components/ui/BackButton'
import ConfirmModal from '@/components/layout/ConfirmModal'

const SkillsPage = () => {
  const [page, setPage] = useState(0)
  const [searchInput, setSearchInput] = useState('')
  const search = useDebounce(searchInput)

  const [formSkill, setFormSkill] = useState<SkillWithCounts | undefined>()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<SkillWithCounts | undefined>()

  const skillsQuery = useGetSkills(page, search)
  const updateSkill = useUpdateSkill()

  const skills = skillsQuery.data?.data ?? []
  const total = skillsQuery.data?.total ?? 0

  const openCreate = () => {
    setFormSkill(undefined)
    setIsFormOpen(true)
  }

  const openEdit = (skill: SkillWithCounts) => {
    setFormSkill(skill)
    setIsFormOpen(true)
  }

  const handleDeactivate = async () => {
    if (!deleteTarget) return
    try {
      await updateSkill.mutateAsync({ id: deleteTarget.id, payload: { isActive: false } })
      ToastMessage({ type: 'success', message: 'Skill deactivated' })
      setDeleteTarget(undefined)
    } catch (error) {
      ToastMessage({ type: 'error', message: getApiErrorMessage(error) })
    }
  }

  return (
    <div className="relative h-full w-full space-y-5 bg-white p-2">
      <div className="space-y-3">
        <BackButton text={'Back'} className="text-xl text-primary" route={`/learn-requests`} />
        <p>
          Here you can manage the skills available on the platform, Keep the skills catalog
          organized and up to date to ensure accurate learning requests and tutor profiles.
        </p>
      </div>
      <div className="min-w-0">
        <div className="flex h-full w-full flex-col gap-4 overflow-y-auto bg-white">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-xl font-semibold text-[#143681]">Skills</h1>
            <AddButton label="New skill" onClick={openCreate} />
          </div>

          <SearchInput
            value={searchInput}
            onChange={(value) => {
              setSearchInput(value)
              setPage(0)
            }}
            onClear={() => {
              setSearchInput('')
              setPage(0)
            }}
            placeholder="Search skills..."
          />

          {skillsQuery.isLoading ? (
            <div className="flex justify-center p-6">
              <Loader width="28" height="28" />
            </div>
          ) : (
            <ul>
              {skills.map((skill) => (
                <li key={skill.id} className="flex items-center justify-between gap-2 px-3 py-2.5">
                  <span className="truncate text-sm font-medium">{skill.name}</span>
                  <div className="flex shrink-0 items-center gap-1">
                    <EditButton label={`Edit ${skill.name}`} onClick={() => openEdit(skill)} />
                    <ConfirmModal
                      name="skill"
                      type="delete"
                      title="Delete skill"
                      description="Deleting this skill permanently will remove it from any tutor profiles and learner interests where it's currently used. This cannot be undone."
                      handleConfirm={async () => {
                        await handleDeactivate()
                      }}
                      buttonClassName="border-none"
                      isLoading={updateSkill.isPending}
                      isOpen={deleteTarget?.id === skill.id}
                      setIsOpen={(open) => {
                        setDeleteTarget(open ? skill : undefined)
                      }}
                    />
                  </div>
                </li>
              ))}
              {skills.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-muted-foreground">
                  No skills found.
                </li>
              )}
            </ul>
          )}

          {skills.length > 0 && (
            <div className="mt-2 flex items-center justify-center">
              <LearnRequestPagination
                currentPage={page}
                totalCount={total}
                take={SKILLS_PAGE_SIZE}
                onPageChange={setPage}
              />
            </div>
          )}

          <SkillFormModal
            open={isFormOpen}
            onOpenChange={setIsFormOpen}
            skill={formSkill}
            existingSkills={skills}
          />
        </div>
      </div>
    </div>
  )
}

export default SkillsPage
