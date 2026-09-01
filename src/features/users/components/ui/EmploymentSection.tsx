import { EmploymentEntry } from '@/features/tutorVerifications/hooks/useGetUserProfile'
import EmploymentItem from './EmploymentItem'

interface EmploymentSectionProps {
  employment: EmploymentEntry[]
  readOnly?: boolean
}

function EmploymentSection({ employment }: EmploymentSectionProps) {
  return (
    <div className="space-y-8 rounded-lg border border-[#D1D5DA] p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold text-[#143681]">Employment history</h2>
      </div>

      <div className="space-y-6 divide-y divide-[#D1D5DA] divide-border">
        {employment.map((job) => (
          <EmploymentItem key={job.id} {...job} />
        ))}
      </div>
    </div>
  )
}
export default EmploymentSection
