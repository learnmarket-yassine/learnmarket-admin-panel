import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { LearnRequestStatus, Proposal } from '../../store/types'
import { Button } from '@/components/ui/button'
import NoResults from '@/components/ui/NoResults'
import Loader from '@/components/ui/Loader/Loader'
import LearnRequestPagination from './LearnRequestPagination'
import LearnRequestProposalCard from './LearnRequestProposalCard'
import { PROPOSALS_PAGE_SIZE } from '../../hooks/useGetLearnRequestProposals'

type LearnRequestProposalsListProps = {
  proposals: Proposal[]
  learnRequestStatus: LearnRequestStatus
  learnRequestId: string
  totalCount: number
  page: number
  setPage: Dispatch<SetStateAction<number>>
  isError?: boolean
  isLoading?: boolean
  hasSearch?: boolean
  onRetry?: () => void
  emptyMessage?: string
}

const LearnRequestProposalsList: React.FC<LearnRequestProposalsListProps> = ({
  proposals,
  learnRequestStatus,
  learnRequestId,
  totalCount,
  page,
  setPage,
  isError,
  isLoading,
  onRetry,
  emptyMessage,
}) => {
  const [selectedProposalId, setSelectedProposalId] = useState<string | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const selectedProposal = proposals.find((p) => p.id === selectedProposalId) ?? null

  useEffect(() => {
    if (selectedProposalId && !selectedProposal) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsSheetOpen(false)
    }
  }, [selectedProposalId, selectedProposal])

  if (isLoading) {
    return <Loader className="flex h-full w-full items-center justify-center" />
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-[#E0E2E6] bg-white p-10 text-center">
        <p className="text-sm font-semibold text-[#1E293B]">
          Something went wrong loading proposals.
        </p>
        <Button type="button" variant="outline" onClick={onRetry} className="rounded-full px-6">
          Try again
        </Button>
      </div>
    )
  }

  if (proposals.length === 0) {
    return <NoResults />
  }

  return (
    <div className="space-y-4">
      <div className="space-y-8">
        {proposals.map((proposal) => (
          <LearnRequestProposalCard
            onSelect={() => {
              setSelectedProposalId(proposal.id)
              setIsSheetOpen(true)
            }}
            key={proposal.id}
            proposal={proposal}
            learnRequestId={learnRequestId}
            learnRequestStatus={learnRequestStatus}
          />
        ))}
      </div>
      <div className="flex items-center justify-end">
        <LearnRequestPagination
          currentPage={page}
          totalCount={totalCount}
          take={PROPOSALS_PAGE_SIZE}
          onPageChange={setPage}
        />
      </div>
      {/* <ProposalDetailsSheet
        key={selectedProposal?.id ?? 'none'}
        proposal={selectedProposal}
        isOpen={isSheetOpen}
        setIsOpen={setIsSheetOpen}
        learnRequestId={learnRequestId}
        learnRequestStatus={learnRequestStatus}
      /> */}
    </div>
  )
}

export default LearnRequestProposalsList
