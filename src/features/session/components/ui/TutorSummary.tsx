import { Clock3, FileText } from 'lucide-react'
import { SessionContext } from '@/features/learn-request/hooks/useGetSessionContext'
import { getBrowserTimezone } from '@/utils/timezones'
import { formatDateLabel, formatSlotTime } from '@/utils/time'
import RichTextContent from '@/components/ui/rich-text-content'

interface TutorSummaryProps {
  context: SessionContext
}

const formatDateTime = (iso: string, timezone: string) =>
  `${formatDateLabel(iso, timezone)} at ${formatSlotTime(iso, timezone)}`

const TutorSummary = ({ context }: TutorSummaryProps) => {
  const timezone = getBrowserTimezone()

  if (!context.summary) {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-5 text-sm text-blue-700">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-100">
          <Clock3 className="size-4 text-blue-600" />
        </div>
        <div className="space-y-1">
          <p className="font-semibold">No summary yet</p>
          <p className="text-blue-600">
            The tutor hasn't submitted a summary for this session yet. It will appear here once it's
            added.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-[#E0E2E6] bg-white p-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-100">
            <FileText className="size-4 text-emerald-700" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#143681]">Tutor summary</h3>
            <p className="text-xs text-[#6B7280]">
              Submitted by {context.tutor.firstname} {context.tutor.lastname}
            </p>
          </div>
        </div>
        {context.summarySubmittedAt && (
          <span className="shrink-0 whitespace-nowrap text-xs text-[#6B7280]">
            {formatDateTime(context.summarySubmittedAt, timezone)}
          </span>
        )}
      </div>
      <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
        <RichTextContent html={context.summary} className="text-base text-slate-600" />
      </div>
    </div>
  )
}

export default TutorSummary
