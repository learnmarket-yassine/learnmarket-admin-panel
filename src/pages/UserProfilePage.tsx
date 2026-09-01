import { Link, useParams } from 'react-router-dom'
import Loader from '@/components/ui/Loader/Loader'
import ProfileHeader from '@/features/users/components/ui/ProfileHeader'
import useGetUserProfile from '@/features/tutorVerifications/hooks/useGetUserProfile'
import ProfileLeftSidebar from '@/features/users/components/ui/ProfileLeftSidebar'
import ProfileMainContent from '@/features/users/components/ui/ProfileMainContent'
import CertificationsSection from '@/features/users/components/ui/CertificationsSection'
import EmploymentSection from '@/features/users/components/ui/EmploymentSection'

const UserProfilePage = () => {
  const { id } = useParams<{ id: string }>()
  const { data: profile, isLoading, isError } = useGetUserProfile(id)

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Loader />
      </div>
    )
  }

  if (isError || !profile) {
    return (
      <div className="space-y-4 rounded-3xl border border-[#E0E2E6] bg-white p-8 text-center">
        <p className="text-lg font-semibold text-[#1E293B]">This user profile couldn't be found.</p>
        <Link
          to="/accueil"
          className="inline-block text-sm font-semibold text-[#2563EB] underline underline-offset-2"
        >
          Back to Accueil
        </Link>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="rounded-lg border border-[#D1D5DA]">
        <ProfileHeader profile={profile} />
        <div className="grid grid-cols-1 border-t border-[#D1D5DA] lg:grid-cols-[1fr_2fr]">
          <ProfileLeftSidebar profile={profile} />
          <ProfileMainContent profile={profile} />
        </div>
      </div>
      {profile.role === 'TUTOR' && (
        <>
          <CertificationsSection
            certifications={profile.tutorProfile?.certifications ?? []}
            tutorId={profile.tutorProfile?.id ?? ''}
          />
          <EmploymentSection employment={profile.tutorProfile?.employment ?? []} />
        </>
      )}
    </div>
  )
}

export default UserProfilePage
