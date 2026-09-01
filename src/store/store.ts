import { authSlice } from '@/features/auth/store/authSlice'
import { AuthSlice } from '@/features/auth/store/types'
import { learnRequestSlice } from '@/features/learn-request/store/learnRequestSlice'
import { LearnRequestSlice } from '@/features/learn-request/store/types'
import { sparksOffersSlice } from '@/features/sparks/store/OffersSlice'
import { SparksOffersSlice } from '@/features/sparks/store/types'
import { tutorVerificationsSlice } from '@/features/tutorVerifications/store/TutorVerificationsSlice'
import { TutorVerificationsSlice } from '@/features/tutorVerifications/store/types'
import { UsersSlice } from '@/features/users/store/types'
import { usersSlice } from '@/features/users/store/UsersSlice'
import { create } from 'zustand'

export const useStore = create<
  AuthSlice & LearnRequestSlice & UsersSlice & TutorVerificationsSlice & SparksOffersSlice
>()((...a) => ({
  ...authSlice(...a),
  ...learnRequestSlice(...a),
  ...usersSlice(...a),
  ...tutorVerificationsSlice(...a),
  ...sparksOffersSlice(...a),
}))
