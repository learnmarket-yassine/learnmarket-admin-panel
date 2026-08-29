import { useStore } from '@/store/store'
import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import useGetLearnRequests from '../../hooks/useGetLearnRequests'
import { LearnRequest, LearnRequestStatus } from '../../store/types'
import Loader from '@/components/ui/Loader/Loader'
import NoResults from '@/components/ui/NoResults'
import LearnRequestCard from './LearnRequestCard'
import { EmptyPage } from './EmptyPage'

const LearnRequests = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { ref, inView } = useInView({
    threshold: 0,
  })
  const formStep = useStore((state) => state.learnRequest.formStep)
  const setSearchWord = useStore((state) => state.learnRequest.setSearchWord)
  const statusMap: Record<number, { status: LearnRequestStatus[] }> = {
    1: { status: ['OPEN', 'CLOSED'] },
    2: { status: ['COMPLETED'] },
    3: { status: ['OPEN', 'CLOSED', 'DRAFT', 'COMPLETED'] },
    4: { status: ['DRAFT'] },
  }
  const status = statusMap[formStep]

  const getLearnRequestsQuery = useGetLearnRequests(status)
  const statusFetch = getLearnRequestsQuery?.status

  useEffect(() => {
    return () => {
      setSearchWord('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (inView && getLearnRequestsQuery.hasNextPage && !getLearnRequestsQuery.isFetchingNextPage) {
      getLearnRequestsQuery.fetchNextPage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, getLearnRequestsQuery.hasNextPage, getLearnRequestsQuery.isFetchingNextPage])

  const ListLearnRequests: LearnRequest[] =
    getLearnRequestsQuery.data?.pages.flatMap((page) => page.paginatedResult) || []

  if (statusFetch === 'pending') {
    return <Loader className="flex h-full w-full items-center justify-center" />
  }

  if (statusFetch === 'error') {
    return <EmptyPage description="there is an issue while fetching learn requests list" />
  }
  return ListLearnRequests.length ? (
    <div ref={containerRef} className="h-full max-h-[400px] overflow-y-auto px-10">
      {' '}
      {/* Set max height and overflow */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {ListLearnRequests.map((learnRequest) => (
          <LearnRequestCard key={learnRequest.id} {...learnRequest} />
        ))}
      </div>
      <div ref={ref} className="h-10 w-full" />
      {getLearnRequestsQuery.isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <Loader />
        </div>
      )}
    </div>
  ) : (
    <NoResults />
  )
}

export default LearnRequests
