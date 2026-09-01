import { useState } from 'react'
import SearchInput from '@/components/ui/SearchInput'
import Loader from '@/components/ui/Loader/Loader'
import ToastMessage from '@/components/layout/ToastMessage'
import { getApiErrorMessage } from '@/lib/api/errors'
import useDebounce from '@/hooks/useDebounce'
import useGetSpecialties, { SPECIALTIES_PAGE_SIZE } from '../hooks/useGetSpecialties'
import useUpdateSpecialty from '../hooks/useUpdateSpecialty'
import { Specialty } from '../types'
import SpecialtyFormModal from './SpecialtyFormModal'
import AddButton from '@/components/ui/AddButton'
import EditButton from '@/components/ui/EditButton'
import LearnRequestPagination from '@/features/learn-request/components/ui/LearnRequestPagination'
import ConfirmModal from '@/components/layout/ConfirmModal'

interface SpecialtiesCardProps {
  categoryId: string
}

const SpecialtiesCard = ({ categoryId }: SpecialtiesCardProps) => {
  const [page, setPage] = useState(0)
  const [searchInput, setSearchInput] = useState('')
  const search = useDebounce(searchInput)

  const [formSpecialty, setFormSpecialty] = useState<Specialty | undefined>()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Specialty | undefined>()

  const specialtiesQuery = useGetSpecialties(categoryId, page, search)
  const updateSpecialty = useUpdateSpecialty()

  const specialties = specialtiesQuery.data?.data ?? []
  const total = specialtiesQuery.data?.total ?? 0
  const openCreate = () => {
    setFormSpecialty(undefined)
    setIsFormOpen(true)
  }

  const openEdit = (specialty: Specialty) => {
    setFormSpecialty(specialty)
    setIsFormOpen(true)
  }

  const handleDeactivate = async () => {
    if (!deleteTarget) return
    try {
      await updateSpecialty.mutateAsync({
        id: deleteTarget.id,
        categoryId,
        payload: { isActive: false },
      })
      ToastMessage({ type: 'success', message: 'Specialty deactivated' })
      setDeleteTarget(undefined)
    } catch (error) {
      ToastMessage({ type: 'error', message: getApiErrorMessage(error) })
    }
  }

  return (
    <div className="rounded-lg border-[0.5px] border-[#9a9dad] p-2">
      <div className="flex items-center justify-between gap-3 p-3">
        <h3 className="text-xl font-semibold text-[#143681]">Specialities</h3>
        <AddButton label="create speciality" onClick={openCreate} />
      </div>
      <div className="p-3">
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
          placeholder="Search specialties..."
        />
      </div>

      {specialtiesQuery.isLoading ? (
        <div className="flex justify-center p-6">
          <Loader width="28" height="28" />
        </div>
      ) : (
        <ul>
          {specialties.map((specialty) => (
            <li key={specialty.id} className="flex items-center justify-between gap-2 px-3 py-2">
              <span className="truncate text-sm">{specialty.name}</span>
              <div className="flex shrink-0 items-center gap-1">
                <EditButton label={`Edit ${specialty.name}`} onClick={() => openEdit(specialty)} />
                <ConfirmModal
                  name="speciality"
                  type="delete"
                  title="Delete speciality"
                  description="Deleting this specialty permanently will remove it from any tutor profiles and learner interests where it's currently used. This cannot be undone."
                  handleConfirm={async () => {
                    await handleDeactivate()
                  }}
                  buttonClassName="border-none"
                  isLoading={updateSpecialty.isPending}
                  isOpen={deleteTarget?.id === specialty.id}
                  setIsOpen={(open) => {
                    setDeleteTarget(open ? specialty : undefined)
                  }}
                />
              </div>
            </li>
          ))}
          {specialties.length === 0 && (
            <li className="px-3 py-4 text-center text-sm text-muted-foreground">
              No specialties found.
            </li>
          )}
        </ul>
      )}
      {specialties.length > 0 && (
        <div className="mt-2 flex items-center justify-center">
          <LearnRequestPagination
            currentPage={page}
            totalCount={total}
            take={SPECIALTIES_PAGE_SIZE}
            onPageChange={setPage}
          />
        </div>
      )}
      <SpecialtyFormModal
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        categoryId={categoryId}
        specialty={formSpecialty}
        existingSpecialties={specialties}
      />
    </div>
  )
}

export default SpecialtiesCard
