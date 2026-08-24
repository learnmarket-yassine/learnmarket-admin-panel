import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useStore } from '@/store/store'
import useGetInitialLearnRequest from '@/features/learn-request/hooks/useGetInitialLearnRequests'
import Loader from '@/components/ui/Loader/Loader'
import LearnRequestList from '@/features/learn-request/components/ui/LearnRequestList'
import EmptyPage from '@/features/learn-request/components/ui/EmptyPage'

const LearnRequestsPage = () => {
  const getLearnRequestQuery = useGetInitialLearnRequest()
  const location = useLocation()
  const resetState = useStore((state) => state.learnRequest.resetState)

  useEffect(() => {
    resetState()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!getLearnRequestQuery.isFetching) {
      getLearnRequestQuery.refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  if (getLearnRequestQuery.isLoading || getLearnRequestQuery.isFetching) {
    return <Loader className="flex h-full w-full items-center justify-center" />
  }

  return (
    <div className="relative h-full w-full bg-white p-2">
      {getLearnRequestQuery.data && getLearnRequestQuery.data.totalCount > 0 ? (
        <LearnRequestList />
      ) : (
        <EmptyPage />
      )}
    </div>
  )
}

export default LearnRequestsPage
