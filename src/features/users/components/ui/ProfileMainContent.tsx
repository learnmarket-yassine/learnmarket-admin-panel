import { UserProfile } from '@/features/tutorVerifications/hooks/useGetUserProfile'
import TutorFeedbackSection from './TutorFeedbackSection'
import { Badge } from '@/components/ui/badge'

interface ProfileMainContentProps {
  profile: UserProfile
}

function ProfileMainContent({ profile }: ProfileMainContentProps) {
  return (
    <div className="flex flex-col divide-y-[0.5px] divide-[#E0E2E6] border-l border-l-[#E0E2E6] bg-white">
      {/* Headline + rate */}
      <div>
        <div className="flex items-start justify-between gap-4 px-6 py-5">
          <div className="flex items-center gap-4">
            <h2 className="max-w-4xl flex-1 text-2xl font-semibold leading-snug text-[#143681]">
              {profile.headline}
            </h2>
          </div>
        </div>
        {/* Bio */}

        <div className="relative p-8">
          <p className="max-w-5xl whitespace-pre-wrap break-words pr-5 text-xl text-[#143681]">
            {profile.bio}
          </p>
        </div>
      </div>
      {profile.role === 'TUTOR' && <TutorFeedbackSection tutorId={profile.id} />}

      {/* Interests */}
      {profile.role === 'LEARNER' && (
        <div className="space-y-5 p-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold text-[#143681]">Interests</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.learnerProfile?.interests.map((interest) => (
              <Badge
                key={interest.id}
                variant="secondary"
                className="h-9 rounded-lg border-none bg-[#F5F6F7] px-4 py-2 text-sm text-[#102A63]"
              >
                {interest.specialty.name}
              </Badge>
            ))}
          </div>
        </div>
      )}
      {/* Specialties */}
      {(profile.tutorProfile?.specialties ?? []).length > 0 && (
        <div className="space-y-5 p-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold text-[#143681]">Specialties</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.tutorProfile?.specialties.map((specialty) => (
              <Badge
                key={specialty.specialty.id}
                variant="secondary"
                className="h-9 rounded-lg border-none bg-[#F5F6F7] px-4 py-2 text-sm text-[#102A63]"
              >
                {specialty.specialty.name}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {(profile.tutorProfile?.skills ?? []).length > 0 && (
        <div className="space-y-5 p-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold text-[#143681]">Skills</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.tutorProfile?.skills.map((skill) => (
              <Badge
                key={skill.skill.id}
                variant="secondary"
                className="h-9 rounded-lg border-none bg-[#F5F6F7] px-4 py-2 text-sm text-[#102A63]"
              >
                {skill.skill.name}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
export default ProfileMainContent
