import CommentBox, { Comment } from './CommentBox'

interface CommentThreadProps {
  comments: Comment[]
}

const CommentThread = ({ comments }: CommentThreadProps) => {
  return (
    <div className="flex flex-col gap-5">
      {comments.length > 0 &&
        comments.map((comment) => {
          return <CommentBox comment={comment} />
        })}
    </div>
  )
}

export default CommentThread
