import { useState } from 'react'
import { useParams } from 'react-router-dom'
import ChevronStepper from '@/features/learn-request/components/ui/ChevronStepper'
import Loader from '@/components/ui/Loader/Loader'
import useGetLearnRequest from '@/features/learn-request/hooks/useGetLearnRequest'
import { STATUS_LABELS } from '@/lib/Constants'
import LearnRequestDetailsStep from '@/features/learn-request/components/ui/LearnRequestDetailsStep'
import BackButton from '@/components/ui/BackButton'
import LearnRequestProposalStep from '@/features/learn-request/components/ui/LearnRequestProposalStep'
import SessionsFlow from '@/features/learn-request/components/ui/SessionsFlow'

const LearnRequestDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const { data } = useGetLearnRequest(id)
  const [selected, setSelected] = useState(1)
  const acceptedProposal = data?.proposals?.find((proposal) => proposal.status === 'ACCEPTED')
  const steps = [
    {
      stepNumber: 1,
      component: <LearnRequestDetailsStep id={id as string} />,
      show: true,
      name: 'view Learn Post',
      enabled: true,
    },
    {
      stepNumber: 2,
      component: data ? (
        <LearnRequestProposalStep learnRequestId={id as string} status={data.status} />
      ) : null,
      show: true,
      name: 'Review proposals',
      enabled: true,
    },
    {
      stepNumber: 3,
      component: acceptedProposal ? <SessionsFlow proposalId={acceptedProposal.id} /> : null,
      show: true,
      name: 'Sessions',
      enabled: !!acceptedProposal,
    },
  ]
  const visibleSteps = steps.filter((step) => step.show)
  const currentStep = visibleSteps.find((step) => step.stepNumber === selected)

  return (
    <>
      <div className="my-6">
        <BackButton text={'Back'} className="text-xl text-primary" route={`/learn-requests`} />
      </div>
      <div className="flex w-full flex-col gap-10">
        <div className="flex items-center justify-between">
          {data ? (
            <>
              <h1 className="text-2xl font-semibold">{data.title}</h1>
              <div className="flex items-center gap-3">
                <span className="rounded-md border bg-[#143681] px-4 py-1 text-sm text-white">
                  {STATUS_LABELS[data.status]}
                </span>
              </div>
            </>
          ) : (
            <Loader className="flex h-full w-full items-center justify-center" />
          )}
        </div>
        <div className="w-full space-y-2">
          <ChevronStepper selected={selected} setSelected={setSelected} steps={steps} />
        </div>
        {currentStep?.component || null}
      </div>
    </>
  )
}

export default LearnRequestDetailsPage
