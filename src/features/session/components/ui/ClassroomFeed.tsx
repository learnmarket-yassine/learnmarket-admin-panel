import Loader from '@/components/ui/Loader/Loader'
import useGetSessionAnnouncements from '../../hooks/useGetSessionAnnouncements'
import AnnouncementCard from './AnnouncementCard'
import { EmptyPage } from '@/features/learn-request/components/ui/EmptyPage'

interface ClassroomFeedProps {
  sessionId: string
}

const ClassroomFeed = ({ sessionId }: ClassroomFeedProps) => {
  const { data: announcements, isLoading } = useGetSessionAnnouncements(sessionId)
  const ordered = [...(announcements ?? [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  if (isLoading) return <Loader className="h-4 w-4 animate-spin" />
  if (!isLoading && ordered.length <= 0)
    return <EmptyPage description="There are no announcements for this session." />
  return (
    <div className="flex flex-col gap-4">
      {ordered.map((announcement) => (
        <AnnouncementCard key={announcement.id} sessionId={sessionId} announcement={announcement} />
      ))}
    </div>
  )
}

export default ClassroomFeed
