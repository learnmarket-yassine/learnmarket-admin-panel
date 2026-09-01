import { useQuery } from '@tanstack/react-query'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { Language, Skill, TutorVerificationStatus } from '@/features/learn-request/store/types'
import { Specialty } from '@/features/taxonomy/types'

export interface Education {
  id: string
  profileId?: string
  institution: string
  degree?: string
  fieldOfStudy?: string
  startYear?: number
  endYear?: number
}

export interface EmploymentEntry {
  id: string
  profileId?: string
  jobTitle: string
  company: string
  description?: string
  startDate: string
  endDate?: string
  current?: boolean
  country?: string
  city?: string
}

export interface CertificationFile {
  id: string
  fileName: string
  mimeType: string
}

export interface Certification {
  id: string
  title: string
  issuer: string
  issuedAt?: string | null
  expiresAt?: string | null
  credentialUrl?: string
  files: CertificationFile[]
}

export type UserProfile = {
  id: string
  firstname: string
  lastname: string
  email: string
  role: 'TUTOR' | 'LEARNER'
  avatar: string | null
  headline: string | null
  bio: string | null
  country: string | null
  city: string | null
  languages: Language[]
  education: Education[]
  tutorProfile: {
    id: string
    videoIntroUrl: string | null
    verificationStatus: TutorVerificationStatus
    skills: { skill: Skill }[]
    specialties: { specialty: Specialty }[]
    certifications: Certification[]
    employment: EmploymentEntry[]
  } | null
  learnerProfile: {
    id: string
    interests: {
      id: string
      createdAt: string
      updatedAt: string
      specialtyId: string
      specialty: Specialty
    }[]
  } | null
}

const useGetUserProfile = (userId: string | undefined) => {
  const axiosPrivate = useAxiosPrivate()

  return useQuery({
    queryKey: ['users', userId, 'profile'],
    queryFn: async (): Promise<UserProfile> => {
      const response = await axiosPrivate.get(`/admin/users/${userId}`)
      return response.data
    },
    enabled: !!userId,
  })
}

export default useGetUserProfile
