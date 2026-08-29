import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import EmptyState from '@/components/ui/EmptyState'
import Loader from '@/components/ui/Loader/Loader'
import { EmptyPage } from '@/features/learn-request/components/ui/EmptyPage'
import { useNavigate } from 'react-router-dom'
import useGetSessionsDisputed, {
  DISPUTED_SESSIONS_PAGE_SIZE,
} from '../../hooks/useGetDisputedSessions'
import DisputedSessionCard from './DisputedSessionCard'
import LearnRequestPagination from '@/features/learn-request/components/ui/LearnRequestPagination'

const DisputedSessionsList = () => {
  const navigate = useNavigate()
  const [page, setPage] = useState(0)

  const { data, isLoading, isError } = useGetSessionsDisputed({
    page,
    take: DISPUTED_SESSIONS_PAGE_SIZE,
  })
  const sessions = useMemo(() => data?.paginatedResult ?? [], [data])

  const totalCount = data?.totalCount ?? 0

  if (isLoading) {
    return <Loader className="flex h-full w-full items-center justify-center" />
  }

  if (isError) {
    return <EmptyState message="Something went wrong while loading your sessions." />
  }

  if (sessions.length === 0) {
    return (
      <EmptyPage
        description={''}
        actionButton={
          <Button
            type="button"
            onClick={() => navigate('/accueil')}
            aria-label="Create Announcement"
            className={`h-full border border-[#2563EB] bg-[#2563EB] p-3 text-white hover:bg-[#2563EB]`}
          >
            <span>Go to Accueil</span>
          </Button>
        }
      />
    )
  }

  return (
    <>
      <div className="space-y-3">
        {sessions.map((session) => (
          <DisputedSessionCard key={session.id} session={session} />
        ))}
      </div>
      <div className="flex justify-end">
        <LearnRequestPagination
          currentPage={page}
          totalCount={totalCount}
          take={DISPUTED_SESSIONS_PAGE_SIZE}
          onPageChange={setPage}
        />
      </div>
    </>
  )
}

export default DisputedSessionsList
