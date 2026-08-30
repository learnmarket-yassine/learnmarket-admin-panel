import SideBarLink from './SideBarLink'
import { useLocation } from 'react-router-dom'
import SettingsIcon from '@/assets/SettingsIcon'
import LogoutIcon from '@/assets/LogoutIcon'
import { useStore } from '@/store/store'
import LearnRequestsIcon from '@/assets/LearnRequestsIcon'
import VideoIcon from '@/assets/VideoIcon'
import { Tags, Sparkles, Users, BadgeCheck, Coins } from 'lucide-react'

const NavLinks = () => {
  const clickedLearnRequestName = useStore((state) => state.learnRequest.clickedLearnRequestName)

  const location = useLocation()
  const navData = [
    {
      to: '/learn-requests',
      icon: <LearnRequestsIcon active={location.pathname.includes('/learn-requests')} />,
      label: clickedLearnRequestName || 'Learn Requests',
      disabled: false,
      isActive: location.pathname.includes('/learn-requests'),
    },
    {
      to: '/sessions',
      icon: <VideoIcon active={location.pathname.includes('/sessions')} />,
      label: 'Disputed Sessions',
      disabled: false,
      isActive: location.pathname.includes('/sessions'),
    },
    {
      to: '/taxonomy',
      icon: <Tags className="size-5" />,
      label: 'Taxonomy',
      disabled: false,
      isActive: location.pathname.includes('/taxonomy'),
    },
    {
      to: '/skills',
      icon: <Sparkles className="size-5" />,
      label: 'Skills',
      disabled: false,
      isActive: location.pathname.includes('/skills'),
    },
    {
      to: '/users',
      icon: <Users className="size-5" />,
      label: 'Users',
      disabled: false,
      isActive: location.pathname.includes('/users'),
    },
    {
      to: '/tutor-verifications',
      icon: <BadgeCheck className="size-5" />,
      label: 'Tutor Verifications',
      disabled: false,
      isActive: location.pathname.includes('/tutor-verifications'),
    },
    {
      to: '/sparks',
      icon: <Coins className="size-5" />,
      label: 'Sparks',
      disabled: false,
      isActive: location.pathname.includes('/sparks'),
    },
  ]

  return (
    <nav className="w-full space-y-8">
      <ul className="flex w-full flex-col items-center gap-2">
        {navData.map((nav) => {
          return (
            <SideBarLink
              key={nav.to}
              to={nav.to}
              icon={nav.icon}
              label={nav.label}
              disabled={nav.disabled}
              isActive={nav.isActive}
            />
          )
        })}
      </ul>

      <div>
        <SideBarLink
          to={'/settings'}
          icon={<SettingsIcon active={location.pathname.includes('/settings')} />}
          label={'Settings'}
          isActive={location.pathname.includes('/settings')}
        />
        <SideBarLink to="/login" icon={<LogoutIcon />} label={'logout'} />
      </div>
    </nav>
  )
}

export default NavLinks
