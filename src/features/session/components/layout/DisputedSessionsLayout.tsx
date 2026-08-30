import BackButton from '@/components/ui/BackButton'

type MySessionsLayoutProps = {
  children: React.ReactNode
}

const DisputedSessionsLayout = ({ children }: MySessionsLayoutProps) => {
  return (
    <div className="relative h-full w-full space-y-8 bg-white p-2">
      <div className="space-y-3">
        <BackButton text={'Back'} className="text-xl text-primary" route={`/learn-requests`} />
        <p className="text-text text-justify">
          Here you can manage disputed sessions between tutors and learners by reviewing the session
          details and the reported issues. You can assess each dispute and decide whether to refund
          the learner or release the payout to the tutor.
        </p>
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  )
}

export default DisputedSessionsLayout
