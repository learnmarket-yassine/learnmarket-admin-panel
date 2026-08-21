import { authSlice } from '@/features/auth/store/authSlice'
import { AuthSlice } from '@/features/auth/store/types'
import { learnRequestSlice } from '@/features/learn-request/store/learnRequestSlice'
import { LearnRequestSlice } from '@/features/learn-request/store/types'
import { create } from 'zustand'

export const useStore = create<AuthSlice & LearnRequestSlice>()((...a) => ({
  ...authSlice(...a),
  ...learnRequestSlice(...a),
}))
