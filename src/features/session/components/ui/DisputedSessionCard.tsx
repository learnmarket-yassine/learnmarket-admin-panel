import { Wallet } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { RichTextContent } from '@/components/ui/rich-text-content'
import ToastMessage from '@/components/layout/ToastMessage'
import { formatBudget, getAssetUrl } from '@/lib/utils'
import { getBrowserTimezone } from '@/utils/timezones'
import { formatDateLabel, formatSlotTime } from '@/utils/time'
import DisputeConfirmDialog from './DisputeConfirmDialog'
import useResolveDispute from '../../hooks/useResolveDispute'
import { DisputedSession, DisputeOutcome, DisputeParticipant } from '../../store/types'
import ViewIcon from '@/assets/ViewIcon'
import { useNavigate } from 'react-router-dom'

type DisputedSessionCardProps = {
  session: DisputedSession
}

const getInitials = (participant: DisputeParticipant) =>
  `${participant.firstname[0] ?? ''}${participant.lastname[0] ?? ''}`.toUpperCase()

const getFullName = (participant: DisputeParticipant) =>
  `${participant.firstname} ${participant.lastname}`

const DisputedSessionCard = ({ session }: DisputedSessionCardProps) => {
  const timezone = getBrowserTimezone()
  const resolveDispute = useResolveDispute()
  const navigate = useNavigate()

  const tutor = session.proposal.tutor
  const learner = session.proposal.learnRequest.learner
  const amount = session.disputedAmount
  const amountLabel = amount
    ? `${formatBudget(amount.amount)} ${amount.currency.toUpperCase()}`
    : null

  const handleResolve = async (nextOutcome: DisputeOutcome, note: string) => {
    try {
      await resolveDispute.mutateAsync({ sessionId: session.id, outcome: nextOutcome, note })
      const counterpartyName =
        nextOutcome === 'RELEASED' ? getFullName(tutor) : getFullName(learner)
      ToastMessage({
        type: 'success',
        message: `${nextOutcome === 'RELEASED' ? 'Payout released' : 'Refund issued'} to ${counterpartyName}.`,
      })

      return true
    } catch {
      return false
    }
  }

  return (
    <div className="flex flex-col space-y-2 rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:cursor-pointer hover:border-[#143681] hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-base font-semibold text-[#143681]">{session.title}</h2>
        <div className="flex items-center gap-5">
          {session.booking && (
            <div className="text-sm text-[#6B7280]">
              {formatDateLabel(session.booking.startTime, timezone)} •{' '}
              {formatSlotTime(session.booking.startTime, timezone)} –{' '}
              {formatSlotTime(session.booking.endTime, timezone)}
            </div>
          )}
          <Button
            className="flex w-fit items-center border border-[#1A46A7] text-[#4C4C4C] hover:bg-[#1A46A7] hover:text-white"
            onClick={() => {
              navigate(`/proposals/${session.proposalId}/sessions/${session.id}`)
            }}
          >
            <ViewIcon />
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <Avatar className="size-8">
              <AvatarImage src={getAssetUrl(tutor.avatar)} alt={getFullName(tutor)} />
              <AvatarFallback className="bg-[#2563EB] text-xs font-semibold text-white">
                {getInitials(tutor)}
              </AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <span className="block text-xs font-medium text-[#6B7280]">Tutor</span>
              <span className="font-medium text-[#1E293B]">{getFullName(tutor)}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Avatar className="size-8">
              <AvatarImage src={getAssetUrl(learner.avatar)} alt={getFullName(learner)} />
              <AvatarFallback className="bg-emerald-600 text-xs font-semibold text-white">
                {getInitials(learner)}
              </AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <span className="block text-xs font-medium text-[#6B7280]">Learner</span>
              <span className="font-medium text-[#1E293B]">{getFullName(learner)}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 font-bold">
          <Wallet className="size-4 text-[#143681]" />
          <p className="text-sm">{amountLabel}</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
        {session.objective ? (
          <RichTextContent html={session.objective} />
        ) : (
          <p className="text-sm italic text-slate-400">No objective provided</p>
        )}
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
        <DisputeConfirmDialog
          trigger={
            <Button
              type="button"
              variant="ghost"
              className="h-full whitespace-nowrap rounded-lg px-6 py-3 font-medium text-[#1A46A7] hover:text-[#1A46A7]"
              disabled={resolveDispute.isPending}
            >
              Refund learner
            </Button>
          }
          title="Refund the learner?"
          description={`${amountLabel ?? 'This amount'} will be refunded to ${getFullName(learner)}. This cannot be undone.`}
          confirmLabel={`Refund ${amountLabel ?? ''}`.trim()}
          isPending={resolveDispute.isPending}
          onConfirm={(note) => handleResolve('REFUNDED', note)}
        />
        <DisputeConfirmDialog
          trigger={
            <Button
              type="button"
              className="h-full whitespace-nowrap rounded-lg bg-[#2563EB] px-6 py-3 font-semibold text-white hover:bg-[#2563EB]"
              disabled={resolveDispute.isPending}
            >
              Release payout
            </Button>
          }
          title="Release the payout?"
          description={`${amountLabel ?? 'This amount'} will be released to ${getFullName(tutor)}. This cannot be undone.`}
          confirmLabel={`Release ${amountLabel ?? ''}`.trim()}
          isPending={resolveDispute.isPending}
          onConfirm={(note) => handleResolve('RELEASED', note)}
        />
      </div>
    </div>
  )
}

export default DisputedSessionCard
