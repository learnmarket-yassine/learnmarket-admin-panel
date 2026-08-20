import { useLocation, useNavigate } from 'react-router-dom'
import LogoHeader from './LogoHeader'
import { useStore } from '@/store/store'
import Loader from '@/components/ui/Loader/Loader'
import LoginRightBlock from './LoginRightBlock'

type Props = {
  children: React.ReactNode
}

const LoginLayout = (props: Props) => {
  const location = useLocation()
  const navigate = useNavigate()
  const auth = useStore((state) => state.auth.authenticationResult)
  const user = useStore((state) => state.auth.user)

  return auth && !user ? (
    <Loader className="flex h-full w-full items-center justify-center" />
  ) : (
    <div className="flex w-full flex-row">
      <div className="flex w-full flex-col bg-white lg:relative lg:basis-7/12">
        <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center p-5 sm:w-1/2 lg:w-full xl:w-auto">
          <button
            onClick={() => navigate('/login')}
            className="flex cursor-pointer flex-col items-center"
            style={{ background: 'none', border: 'none', padding: 0 }}
          >
            <LogoHeader
              title={
                location.pathname === '/reset-password'
                  ? 'Password Reset'
                  : location.pathname === '/forgot-password'
                    ? 'Forgot Password?'
                    : 'Welcome' + '!'
              }
            />
          </button>
          {props.children}
        </div>
      </div>
      <LoginRightBlock />
    </div>
  )
}

export default LoginLayout
