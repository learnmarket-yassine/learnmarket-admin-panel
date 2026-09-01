import { Certification } from '@/features/tutorVerifications/hooks/useGetUserProfile'
import CertificationItem from './CertificationItem'

interface CertificationsSectionProps {
  certifications: Certification[]
  tutorId: string
}

function CertificationsSection({ certifications, tutorId }: CertificationsSectionProps) {
  return (
    <div className="rounded-lg border border-[#D1D5DA] p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold text-[#143681]">Certifications</h2>
      </div>

      <div className="space-y-4 divide-y divide-[#D1D5DA] divide-border">
        {certifications.map((certification) => (
          <CertificationItem tutorId={tutorId} key={certification.id} {...certification} />
        ))}
      </div>
    </div>
  )
}
export default CertificationsSection
