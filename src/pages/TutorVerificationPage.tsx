import BackButton from '@/components/ui/BackButton'
import TutorVerificationsTable from '@/features/tutorVerifications/components/ui/TutorVerificationsTable'

const TutorVerificationsPage = () => {
  return (
    <div
      className="h-full space-y-7 p-4"
      style={{
        maxHeight: `calc(100% - 100px)`,
      }}
    >
      <div className="space-y-3">
        <BackButton text={'Back'} className="text-xl text-primary" route={`/learn-requests`} />
        <p>
          Here you can manage tutor verifications on the platform, Review submitted profiles, verify
          tutor information, and ensure a trusted and reliable experience for all learners.
        </p>
      </div>
      <TutorVerificationsTable />
    </div>
  )
}

export default TutorVerificationsPage
