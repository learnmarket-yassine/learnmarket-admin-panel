type Auth = {
  token: string
}

export type AuthUser = {
  id: string
  email: string
  firstname: string
  lastname: string
  avatar: string | null
  phone?: string
  phoneCountryCode?: string
  dateOfBirth?: string
  address?: string
  city?: string
  state?: string
  postalCode?: string
}

type AuthState = {
  authenticationResult: Auth | null
  setAuthenticationResult: (auth: Auth | null) => void
  user: AuthUser | null
  setUser: (user: AuthUser | null) => void
}
export type AuthSlice = {
  auth: AuthState
}
