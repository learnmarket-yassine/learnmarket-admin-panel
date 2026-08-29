import BackButton from '@/components/ui/BackButton'
import { SessionContext } from '@/features/learn-request/hooks/useGetSessionContext'
import MeetingCard from '../ui/MeetingCard'
import { MeetingDetails } from '@/features/learn-request/store/types'
import DisputeConfirmDialog from '../ui/DisputeConfirmDialog'
import { Button } from '@/components/ui/button'
import useResolveDispute from '../../hooks/useResolveDispute'
import { formatBudget } from '@/lib/utils'
import { DisputeOutcome, DisputeParticipant } from '../../store/types'
import ToastMessage from '@/components/layout/ToastMessage'

type SessionRoomDetailsLayoutProps = {
  children: React.ReactNode
  context: SessionContext
  meeting: MeetingDetails
  sessionId: string
  proposalId: string
}

const getFullName = (participant: DisputeParticipant) =>
  `${participant.firstname} ${participant.lastname}`

const SessionRoomDetailsLayout = ({
  children,
  meeting,
  context,
  sessionId,
}: SessionRoomDetailsLayoutProps) => {
  const resolveDispute = useResolveDispute()
  const tutor = context.tutor
  const learner = context.learner
  const amount = context.disputedAmount
  const amountLabel = amount
    ? `${formatBudget(amount.amount)} ${amount.currency.toUpperCase()}`
    : null

  const handleResolve = async (nextOutcome: DisputeOutcome, note: string) => {
    try {
      await resolveDispute.mutateAsync({ sessionId: sessionId, outcome: nextOutcome, note })
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
    <div className="w-full space-y-8">
      <div className="flex w-full items-center justify-between">
        <BackButton />
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
      <div className="grid grid-cols-[380px_1fr] gap-6">
        <MeetingCard context={context} meeting={meeting} sessionId={sessionId} />
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  )
}

export default SessionRoomDetailsLayout
