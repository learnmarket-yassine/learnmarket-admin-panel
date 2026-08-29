import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CommentAuthor } from '@/features/learn-request/store/types'
import { getAssetUrl } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'

export interface Comment {
  id: string
  content: string
  createdAt: string
  author: CommentAuthor
}

interface CommentBoxProps {
  comment: Comment
}

const CommentBox = ({ comment }: CommentBoxProps) => {
  return (
    <div className="space-y-2">
      <span className="flex items-center justify-end text-xs">
        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
      </span>
      <div className="flex items-start gap-4">
        <Avatar size="lg">
          <AvatarImage src={getAssetUrl(comment.author.avatar)} />
          <AvatarFallback>
            {comment.author.firstname[0]}
            {comment.author.lastname[0]}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between">
            <span className="text-sm font-semibold">
              {comment.author.firstname} {comment.author.lastname}
            </span>
          </div>
          <p className="whitespace-pre-wrap break-words text-sm">{comment.content}</p>
        </div>
      </div>
    </div>
  )
}

export default CommentBox
