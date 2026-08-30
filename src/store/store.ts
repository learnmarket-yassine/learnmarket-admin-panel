import { authSlice } from '@/features/auth/store/authSlice'
import { AuthSlice } from '@/features/auth/store/types'
import { learnRequestSlice } from '@/features/learn-request/store/learnRequestSlice'
import { LearnRequestSlice } from '@/features/learn-request/store/types'
import { UsersSlice } from '@/features/users/store/types'
import { usersSlice } from '@/features/users/store/UsersSlice'
import { create } from 'zustand'

export const useStore = create<AuthSlice & LearnRequestSlice & UsersSlice>()((...a) => ({
  ...authSlice(...a),
  ...learnRequestSlice(...a),
  ...usersSlice(...a),
}))
