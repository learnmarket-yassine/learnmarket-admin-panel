import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

interface EmploymentItemProps {
  id: string
  profileId?: string
  jobTitle: string
  company: string
  description?: string
  startDate: string
  endDate?: string
  current?: boolean
}

function EmploymentItem({
  jobTitle,
  company,
  startDate,
  endDate,
  description,
  current = false,
}: EmploymentItemProps) {
  return (
    <div className="space-y-8 py-8">
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-2">
          <p className="text-xl font-semibold text-[#143681]">
            {jobTitle} | {company}
          </p>
          <p className="text-base text-[#143681]">
            {format(startDate, 'PPP', { locale: fr })} -{' '}
            {endDate
              ? format(endDate, 'PPP', { locale: fr })
              : current
                ? format(new Date(), 'PPP', { locale: fr })
                : null}
          </p>
        </div>
      </div>
      <p className="text-base leading-relaxed text-[#143681]">{description}</p>
    </div>
  )
}
export default EmploymentItem
