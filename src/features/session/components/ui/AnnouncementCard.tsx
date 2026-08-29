import { formatDistanceToNow } from 'date-fns'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { RichTextContent } from '@/components/ui/rich-text-content'
import { formatFileSize, getAssetUrl } from '@/lib/utils'
import useDownloadClassroomAttachment from '../../hooks/useDownloadClassroomAttachment'
import { Announcement } from '@/features/learn-request/store/types'
import CommentThread from './CommentThread'

interface AnnouncementCardProps {
  sessionId: string
  announcement: Announcement
}

const AnnouncementCard = ({ announcement }: AnnouncementCardProps) => {
  const { handleDownload } = useDownloadClassroomAttachment()

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-[#E0E2E6] bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Avatar size="lg">
            <AvatarImage src={getAssetUrl(announcement.author.avatar)} />
            <AvatarFallback>
              {announcement.author.firstname[0]}
              {announcement.author.lastname[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold">
                {announcement.author.firstname} {announcement.author.lastname}
              </span>
              <span className="text-sm text-[#6B7280]">
                {formatDistanceToNow(new Date(announcement.createdAt), { addSuffix: true })}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <RichTextContent html={announcement.content} />
        {announcement.attachments.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {announcement.attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="flex items-center gap-1 rounded-full border border-[#E0E2E6] bg-[#F9FAFB] px-3 py-1 text-xs text-[#374151]"
              >
                <button
                  type="button"
                  onClick={() =>
                    handleDownload(
                      `/announcements/${announcement.id}/attachments/${attachment.id}/url`
                    )
                  }
                  className="hover:text-[#2563EB]"
                >
                  {attachment.fileName} {formatFileSize(attachment.fileSize)}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <CommentThread comments={announcement.comments} />
    </div>
  )
}

export default AnnouncementCard
