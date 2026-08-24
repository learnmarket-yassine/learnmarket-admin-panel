import { useParams } from 'react-router-dom'
import { useState } from 'react'
import Loader from '@/components/ui/Loader/Loader'
import useGetSessionContext from '@/features/learn-request/hooks/useGetSessionContext'
import SessionRoomDetailsLayout from '@/features/session/components/layout/SessionRoomDetailsLayout'
import useGetMeetingDetails from '@/features/session/hooks/useGetMeetingDetails'
import CustomSessionDetailsTabToggle from '@/features/session/components/ui/CustomSessionDetailsTabToggle'
import ClassroomFeed from '@/features/session/components/ui/ClassroomFeed'

const SessionDetailPage = () => {
  const { proposalId, sessionId } = useParams<{
    proposalId: string
    sessionId: string
  }>()
  const [selectedStep, setSelectedStep] = useState(1)

  const { data: context, isLoading: isContextLoading } = useGetSessionContext(sessionId)

  const { data: meeting, isLoading: isMeetingLoading } = useGetMeetingDetails(sessionId)

  if (!proposalId || !sessionId) {
    return null
  }

  if (isContextLoading || isMeetingLoading || !context || !meeting) {
    return <Loader className="h-4 w-4 animate-spin" />
  }

  const steps = [
    {
      stepNumber: 1,
      component: <ClassroomFeed sessionId={sessionId} />,
      show: true,
      name: 'Session announcement',
      enabled: true,
    },
    {
      stepNumber: 3,
      component: <></>,
      show: true,
      name: 'Session Feedback',
      enabled: context.status === 'PENDING_REVIEW',
    },
  ]

  const visibleSteps = steps.filter((step) => step.show)
  const currentStep = visibleSteps.find((step) => step.stepNumber === selectedStep)

  return (
    <SessionRoomDetailsLayout
      sessionId={sessionId}
      proposalId={proposalId}
      context={context}
      meeting={meeting}
    >
      <div className="space-y-10">
        <div className="flex items-center border-b-[1px] border-[#E0E2E6]">
          <CustomSessionDetailsTabToggle
            steps={steps}
            selected={selectedStep}
            setSelected={setSelectedStep}
          />
        </div>
        <div className="flex-1">{currentStep?.component || null}</div>
      </div>
    </SessionRoomDetailsLayout>
  )
}

export default SessionDetailPage
