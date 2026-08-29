import Loader from '@/components/ui/Loader/Loader'
import SessionsList from './SessionsList'
import { useGetProposal } from '../../hooks/useGetProposal'

interface SessionsFlowProps {
  proposalId: string
}

const SessionsFlow = ({ proposalId }: SessionsFlowProps) => {
  const proposalQuery = useGetProposal(proposalId)
  if (proposalQuery.isPending) {
    return <Loader className="flex h-full w-full items-center justify-center" />
  }

  if (proposalQuery.isError) {
    return (
      <div className="rounded-3xl border border-[#E0E2E6] bg-white p-6">
        <p className="text-sm text-destructive">Couldn't load this booking.</p>
      </div>
    )
  }

  const proposal = proposalQuery.data
  const orderedSessions = [...(proposal?.sessions ?? [])].sort(
    (a, b) => a.sessionNumber - b.sessionNumber
  )

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-[#E0E2E6] bg-white p-6">
      <SessionsList sessions={orderedSessions} proposal={proposal} canSchedule={false} />
    </div>
  )
}

export default SessionsFlow
