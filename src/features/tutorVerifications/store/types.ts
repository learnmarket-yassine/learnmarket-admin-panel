type CertificationFile = {
  fileName: string
  mimeType: string
  id: string
}

type Certification = {
  id: string
  credentialUrl?: string
  files: CertificationFile[]
}

export type TutorVerification = {
  id: string
  user: {
    id: string
    email: string
    firstname: string
    lastname: string
    avatar: string | null
  }
  certifications: Certification[]
  verificationStatus: string
  submittedAt?: string
}

export type TutorVerificationsSlice = {
  tutorVerifications: {
    tutorVerifications: TutorVerification[]
    setTutorVerifications: (tutorVerification: TutorVerification[]) => void
  }
}
