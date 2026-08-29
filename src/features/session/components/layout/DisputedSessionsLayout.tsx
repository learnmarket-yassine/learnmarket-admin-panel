import BackButton from '@/components/ui/BackButton'

type MySessionsLayoutProps = {
  children: React.ReactNode
}

const DisputedSessionsLayout = ({ children }: MySessionsLayoutProps) => {
  return (
    <div className="relative h-full w-full space-y-8 bg-white p-2">
      <div className="flex items-center justify-between">
        <BackButton text={'Back'} className="text-xl text-primary" route={`/learn-requests`} />
      </div>
      <div className="w-full space-y-3">
        <h2 className="text-2xl font-semibold text-blue-600">Sessions</h2>
        <p className="text-text text-justify">Here you can manage the disputed sessions.</p>
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  )
}

export default DisputedSessionsLayout
