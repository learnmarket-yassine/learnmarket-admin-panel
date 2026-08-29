import { AlertTriangle, CheckCircle2, Clock3 } from 'lucide-react'
import { SessionContext } from '@/features/learn-request/hooks/useGetSessionContext'
import { getBrowserTimezone } from '@/utils/timezones'
import { formatDateLabel, formatSlotTime } from '@/utils/time'
import RichTextContent from '@/components/ui/rich-text-content'

interface LearnerFeedbackProps {
  context: SessionContext
}

const formatDateTime = (iso: string, timezone: string) =>
  `${formatDateLabel(iso, timezone)} at ${formatSlotTime(iso, timezone)}`

const LearnerFeedback = ({ context }: LearnerFeedbackProps) => {
  const timezone = getBrowserTimezone()
  const learnerName = context.learner
    ? `${context.learner.firstname} ${context.learner.lastname}`
    : 'The learner'

  if (context.dispute) {
    return (
      <div className="flex flex-col gap-4 rounded-2xl border border-red-100 bg-red-50 p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="size-4 text-red-600" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-red-700">Dispute raised</h3>
              <p className="text-xs text-red-500">{learnerName} disputed this session</p>
            </div>
          </div>
          {context.dispute.raisedAt && (
            <span className="shrink-0 whitespace-nowrap text-xs text-red-500">
              {formatDateTime(context.dispute.raisedAt, timezone)}
            </span>
          )}
        </div>
        <div className="rounded-xl border border-red-100 bg-white/70 p-4">
          <RichTextContent
            html={context.dispute.reason}
            className="text-sm leading-relaxed text-slate-600"
          />
        </div>
      </div>
    )
  }

  if (context.learnerConfirmedAt) {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="size-4 text-emerald-700" />
        </div>
        <div className="flex-1 space-y-1">
          <p className="text-sm font-semibold text-emerald-800">
            {learnerName} confirmed the session goal was met
          </p>
          <p className="text-sm text-emerald-700">No dispute was raised for this session.</p>
        </div>
        <span className="shrink-0 whitespace-nowrap text-xs text-emerald-600">
          {formatDateTime(context.learnerConfirmedAt, timezone)}
        </span>
      </div>
    )
  }

  return (
    <div className="flex items-start gap-3 rounded-2xl border border-amber-100 bg-amber-50 p-5 text-sm text-amber-700">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-amber-100">
        <Clock3 className="size-4 text-amber-600" />
      </div>
      <div className="space-y-1">
        <p className="font-semibold">No decision yet</p>
        <p className="text-amber-600">
          {learnerName} hasn't confirmed the session or raised a dispute yet.
        </p>
      </div>
    </div>
  )
}

export default LearnerFeedback
