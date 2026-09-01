import { MapPin } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import AvatarImg from '@/assets/images/avatar.png'
import { getAssetUrl } from '@/lib/utils'
import { UserProfile } from '@/features/tutorVerifications/hooks/useGetUserProfile'
import VerifiedBadge from '@/features/learn-request/components/ui/VerifiedBadge'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import {
  ModalState,
  VerificationAction,
} from '@/features/tutorVerifications/components/ui/TutorVerificationsTable'
import useApproveTutorVerification from '@/features/tutorVerifications/hooks/useApproveTutorVerification'
import useDisapproveTutorVerification from '@/features/tutorVerifications/hooks/useDisapproveTutorVerification'
import { TutorVerification } from '@/features/tutorVerifications/store/types'
import ConfirmModal from '@/components/layout/ConfirmModal'
import TutorVerificationDisapproveModal from '@/features/tutorVerifications/components/ui/TutorVerificationDisapproveModal'

interface ProfileHeaderProps {
  profile: UserProfile
}

function ProfileHeader({ profile }: ProfileHeaderProps) {
  const initials = `${profile.firstname} ${profile.lastname}`
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const [openApproveModal, setOpenApproveModal] = useState<ModalState>({ isOpen: false })
  const [openDisapproveModal, setOpenDisapproveModal] = useState<ModalState>({ isOpen: false })

  const { mutateAsync: approveTutorVerification, isPending: isApprovalPending } =
    useApproveTutorVerification()

  const { mutateAsync: disapproveTutorVerification, isPending: isDisapprovalPending } =
    useDisapproveTutorVerification()

  const handleClick = (id: string, action: VerificationAction, verification: TutorVerification) => {
    if (action === 'approve') {
      setOpenApproveModal({ isOpen: true, id, verificationData: verification })
      return
    }
    setOpenDisapproveModal({ isOpen: true, id, verificationData: verification })
  }

  const handleCloseApproveModal = () => {
    setOpenApproveModal({
      isOpen: false,
    })
  }

  const handleCloseDisapproveModal = () => {
    setOpenDisapproveModal({ isOpen: false })
  }

  const handleApprove = async () => {
    if (!openApproveModal.id) return
    await approveTutorVerification(openApproveModal.id)
    handleCloseApproveModal()
  }

  const handleDisapprove = async (reason: string) => {
    if (!openDisapproveModal.id) return
    await disapproveTutorVerification({ id: openDisapproveModal.id, reason })
    handleCloseDisapproveModal()
  }

  const approveUsername = openApproveModal.verificationData
    ? `${openApproveModal.verificationData.user.firstname} ${openApproveModal.verificationData.user.lastname}`
    : ''

  return (
    <>
      <div className="flex items-start justify-between gap-4 p-8">
        {/* Left: avatar + info */}
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 shrink-0 after:border-none">
            <AvatarImage src={getAssetUrl(profile.avatar) || AvatarImg} alt={initials} />
            <AvatarFallback className="bg-blue-600 text-lg font-semibold text-white">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold text-[#143681]">
                {profile.firstname} {profile.lastname}
              </h1>
              <VerifiedBadge status={profile?.tutorProfile?.verificationStatus} />
            </div>
            <div className="flex flex-wrap items-center gap-1 text-base text-[#143681]">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {profile.country}
              </span>
              <span>-</span>
              <span className="flex items-center gap-1">
                {new Date().toLocaleTimeString('en-US', {
                  timeZone: 'UTC',
                  hour: '2-digit',
                  minute: '2-digit',
                })}{' '}
                UTC
              </span>
            </div>
          </div>
        </div>

        {/* Right: action buttons */}
        <div className="flex shrink-0 items-center gap-2">
          {profile.role === 'TUTOR' && profile.tutorProfile?.verificationStatus === 'PENDING' && (
            <>
              <Button
                onClick={() => {
                  if (!profile.tutorProfile) return
                  handleClick(profile.tutorProfile.id, 'approve', {
                    id: profile?.tutorProfile?.id,
                    user: {
                      id: profile.id,
                      email: profile.email,
                      firstname: profile.firstname,
                      lastname: profile.lastname,
                      avatar: profile.avatar,
                    },
                    certifications: profile.tutorProfile.certifications.map((cert) => ({
                      credentialUrl: cert.credentialUrl,
                      files: cert.files.map((file) => ({
                        id: file.id,
                        fileName: file.fileName,
                        mimeType: file.mimeType,
                      })),
                      id: cert.id,
                    })),
                    verificationStatus: profile.tutorProfile.verificationStatus,
                  })
                }}
                className="h-12 rounded-full bg-[#2563EB] px-6 py-3 text-base font-semibold text-white hover:bg-[#2563EB]/90"
              >
                Approve
              </Button>
              <Button
                onClick={() => {
                  if (!profile.tutorProfile) return
                  handleClick(profile.tutorProfile.id, 'disapprove', {
                    id: profile?.tutorProfile?.id,
                    user: {
                      id: profile.id,
                      email: profile.email,
                      firstname: profile.firstname,
                      lastname: profile.lastname,
                      avatar: profile.avatar,
                    },
                    certifications: profile.tutorProfile.certifications.map((cert) => ({
                      credentialUrl: cert.credentialUrl,
                      files: cert.files.map((file) => ({
                        id: file.id,
                        fileName: file.fileName,
                        mimeType: file.mimeType,
                      })),
                      id: cert.id,
                    })),
                    verificationStatus: profile.tutorProfile.verificationStatus,
                  })
                }}
                className="h-12 rounded-full border-[#2563EB] px-6 py-3 text-base font-semibold text-[#2563EB]"
              >
                Disapprove
              </Button>
            </>
          )}
        </div>
      </div>
      <ConfirmModal
        type={'active'}
        name="Tutor Verification"
        confirmButtonText={'Approve'}
        title={`Approve ${approveUsername}'s tutor verification`}
        description={`Are you sure you want to approve ${approveUsername}'s tutor verification? This will allow the tutor to become verified on the platform.`}
        isOpen={openApproveModal.isOpen}
        setIsOpen={() => handleCloseApproveModal()}
        handleConfirm={handleApprove}
        handleClickCancel={handleCloseApproveModal}
        isLoading={isApprovalPending}
      />
      <TutorVerificationDisapproveModal
        isOpen={openDisapproveModal.isOpen}
        verification={openDisapproveModal.verificationData}
        isLoading={isDisapprovalPending}
        onClose={handleCloseDisapproveModal}
        onConfirm={handleDisapprove}
      />
    </>
  )
}
export default ProfileHeader
