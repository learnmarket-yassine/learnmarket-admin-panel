import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Wallet } from 'lucide-react'
import { formatBudget, getAssetUrl } from '@/lib/utils'
import useLineClamp from '@/hooks/useLineClamp'
import RichTextContent from '@/components/ui/rich-text-content'
import { LearnRequestStatus, Proposal } from '../../store/types'
import useGetTutorRating from '../../hooks/useGetTutorRating'
import VerifiedBadge from './VerifiedBadge'
import TutorRatingBadge from './TutorRatingBadge'
import { PAYOUT_METHOD_LABELS } from '@/lib/Constants'
import SkillsSlider from './SkillsCarousel'

type LearnRequestProposalCardProps = {
  proposal: Proposal
  learnRequestId: string
  learnRequestStatus: LearnRequestStatus
  onSelect: () => void
}

const DESCRIPTION_LINES = 3

const LearnRequestProposalCard = ({ proposal, onSelect }: LearnRequestProposalCardProps) => {
  const { tutor } = proposal
  const navigate = useNavigate()
  const { data: rating } = useGetTutorRating(tutor.id)

  const initials =
    `${tutor.firstname?.charAt(0) ?? ''}${tutor.lastname?.charAt(0) ?? ''}`.toUpperCase()
  const fullName = `${tutor.firstname} ${tutor.lastname}`

  const {
    ref: descriptionRef,
    isExpanded,
    isClampable,
    toggle,
    className: clampClassName,
  } = useLineClamp(proposal.message, { lines: DESCRIPTION_LINES })

  return (
    <>
      <div
        onClick={onSelect}
        className="group cursor-pointer rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#143681] hover:shadow-lg"
      >
        <div className="flex items-start gap-4">
          <Avatar className="h-20 w-20 cursor-pointer after:border-none">
            <AvatarImage src={getAssetUrl(tutor.avatar)} alt={fullName} />
            <AvatarFallback className="bg-[#2563EB] text-sm font-semibold text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/tutors/${tutor.id}`)
                      }}
                      className="text-sm font-medium hover:underline"
                    >
                      {fullName}
                    </button>
                    <VerifiedBadge status={tutor.tutorProfile?.verificationStatus} />
                  </div>
                  {tutor.headline && <p className="text-sm font-bold">{tutor.headline}</p>}
                  {tutor.country && <span className="text-sm">{tutor.country}</span>}
                  <TutorRatingBadge summary={rating} />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <p className="text-sm font-bold">{formatBudget(proposal.totalPrice)} TND</p>
              <div className="flex items-center gap-2 font-bold">
                <Wallet className="size-4 text-[#143681]" />
                <p className="text-sm">{PAYOUT_METHOD_LABELS[proposal.payoutMethod]}</p>
              </div>
            </div>
            {proposal.message && (
              <div>
                <RichTextContent
                  ref={descriptionRef}
                  html={proposal.message}
                  className={`${clampClassName} text-sm text-[#6B7280]`}
                />
                {isClampable && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggle()
                    }}
                    className="text-sm font-semibold text-[#565A60] underline"
                  >
                    {isExpanded ? 'See less' : 'See more'}
                  </button>
                )}
              </div>
            )}
            <SkillsSlider skills={tutor.tutorProfile?.skills} />
          </div>
        </div>
      </div>
    </>
  )
}

export default LearnRequestProposalCard
