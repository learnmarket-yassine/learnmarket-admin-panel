import { languageLevelLabels } from '@/lib/Constants'
import { getYoutubeThumbnailUrl } from '@/lib/utils'
import { useState } from 'react'
import { Education, UserProfile } from '@/features/tutorVerifications/hooks/useGetUserProfile'
import { Language } from '@/features/learn-request/store/types'
import VideoModal from './VideoModal'

interface ProfileLeftSidebarProps {
  profile: UserProfile
}

function ProfileLeftSidebar({ profile }: ProfileLeftSidebarProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const videoIntroUrl = profile.tutorProfile?.videoIntroUrl
  const videoThumbnailUrl = videoIntroUrl ? getYoutubeThumbnailUrl(videoIntroUrl) : undefined

  return (
    <div className="flex flex-col bg-white p-8">
      {/* Video introduction */}
      {videoIntroUrl && (
        <div className="px-5 py-4">
          {!videoIntroUrl ? (
            <div className="flex items-center justify-between">
              <p className="text-xl font-semibold text-[#143681]">Video introduction</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <p className="text-xl font-semibold text-[#143681]">Meet {profile.firstname}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsVideoOpen(true)}
                className="relative mt-3 block aspect-video w-full overflow-hidden rounded-[16px] bg-[#F5F6F7]"
              >
                <img
                  src={videoThumbnailUrl}
                  alt="Video introduction preview"
                  className="h-full w-full object-cover"
                />
              </button>
            </>
          )}
        </div>
      )}
      {videoIntroUrl && (
        <VideoModal isOpen={isVideoOpen} setIsOpen={setIsVideoOpen} videoUrl={videoIntroUrl} />
      )}
      {/* Languages */}
      {profile.languages.length > 0 && (
        <div className="px-5 py-4">
          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold text-[#143681]">Languages</p>
          </div>
          <ul className="mt-1 space-y-0.5">
            {profile.languages.map((lang: Language) => (
              <li key={lang.language} className="text-sm font-normal text-[#143681]">
                <span className="font-semibold">{lang.language}</span>:{' '}
                {languageLevelLabels[lang.level] ?? lang.level}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Education */}
      {profile.education.length > 0 && (
        <div className="px-5 py-4">
          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold text-[#143681]">Education</p>
          </div>
          {profile.education.map((edu: Education) => (
            <div key={edu.id} className="flex items-center justify-between">
              <div className="text-sm font-normal text-[#143681]">
                <p className="font-semibold">{edu.institution}</p>
                <p>{edu.degree}</p>
                <p>
                  {edu.startYear} - {edu.endYear}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
export default ProfileLeftSidebar
