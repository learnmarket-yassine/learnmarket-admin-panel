import DisputedSessionsLayout from '@/features/session/components/layout/DisputedSessionsLayout'
import DisputedSessionsList from '@/features/session/components/ui/DisputedSessionsList'

const DisputedSessionsPage = () => {
  return (
    <DisputedSessionsLayout>
      <div className="flex-1 space-y-8">
        <DisputedSessionsList />
      </div>
    </DisputedSessionsLayout>
  )
}

export default DisputedSessionsPage
