import { useNavigate } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'
import useGetLearnRequest from '../../hooks/useGetLearnRequest'
import Loader from '@/components/ui/Loader/Loader'
import EmptyState from '@/components/ui/EmptyState'
import LearnRequestDetailsContent from './LearnRequestDetailsContent'
import LearnRequestSidebarStats from './LearnRequestSidebarStats'

type Props = {
  id: string
}

const LearnRequestDetailsStep = ({ id }: Props) => {
  const navigate = useNavigate()
  const { data, isLoading, isError } = useGetLearnRequest(id)

  if (isLoading) {
    return <Loader className="flex h-full w-full items-center justify-center" />
  }

  if (isError || !data) {
    return (
      <EmptyState
        icon={AlertCircle}
        message="This request couldn't be loaded. It may not exist, or you may not have access to it."
        ctaLabel="Back to learn requests"
        onCta={() => navigate('/learning-requests')}
      />
    )
  }

  return (
    <div className="space-y-4">
      <div className="divide-y-[0.5px] divide-[#E0E2E6]">
        <div className="flex items-center pb-2 text-sm text-gray-500">
          <span>Posted {new Date(data.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="grid grid-cols-1 gap-10 divide-x-[0.5px] divide-[#E0E2E6] lg:grid-cols-[1fr_320px]">
          <LearnRequestDetailsContent request={data} />
          {/* <LearnRequestSidebarStats /> */}
        </div>
      </div>
    </div>
  )
}

export default LearnRequestDetailsStep
