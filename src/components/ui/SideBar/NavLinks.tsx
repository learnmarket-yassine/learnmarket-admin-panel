import SideBarLink from './SideBarLink'
import { useLocation } from 'react-router-dom'
import SettingsIcon from '@/assets/SettingsIcon'
import LogoutIcon from '@/assets/LogoutIcon'
import { useStore } from '@/store/store'
import LearnRequestsIcon from '@/assets/LearnRequestsIcon'

const NavLinks = () => {
  const clickedLearnRequestName = useStore((state) => state.auth.clickedLearnRequestName)

  const location = useLocation()
  const navData = [
    {
      to: '/learn-requests',
      icon: <LearnRequestsIcon active={location.pathname.includes('/learn-requests')} />,
      label: clickedLearnRequestName || 'Learn Requests',
      disabled: false,
      isActive: location.pathname.includes('/contact'),
    },
  ]

  return (
    <nav className="w-full space-y-20">
      <ul className="flex w-full flex-col items-center gap-6">
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
