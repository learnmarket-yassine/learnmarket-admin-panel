import BackButton from '@/components/ui/BackButton'
import { SessionContext } from '@/features/learn-request/hooks/useGetSessionContext'
import MeetingCard from '../ui/MeetingCard'
import { MeetingDetails } from '@/features/learn-request/store/types'

type SessionRoomDetailsLayoutProps = {
  children: React.ReactNode
  context: SessionContext
  meeting: MeetingDetails
  sessionId: string
  proposalId: string
}

const SessionRoomDetailsLayout = ({
  children,
  meeting,
  context,
  sessionId,
}: SessionRoomDetailsLayoutProps) => {
  return (
    <div className="w-full space-y-8">
      <div className="flex w-full items-center justify-between">
        <BackButton />
      </div>
      <div className="grid grid-cols-[380px_1fr] gap-6">
        <MeetingCard context={context} meeting={meeting} sessionId={sessionId} />
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  )
}

export default SessionRoomDetailsLayout
