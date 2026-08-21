import { Link } from 'react-router-dom'
import OthentisLogo from '@/assets/YoraLogo'
import NavLinks from './NavLinks'

const SideBar = () => {
  const user = { firstname: 'yassine', lastname: 'ben hadj ali' }

  return (
    <aside className="flex h-full w-64 flex-col bg-[#F2F2F2]">
      <div className="flex-grow overflow-y-auto">
        <div className="flex flex-col items-center gap-8 p-4">
          <Link to="/" className="py-6">
            <OthentisLogo />
          </Link>
          <>
            <NavLinks />
          </>
        </div>
      </div>

      <div className="bg-[#2563EB] p-4 text-white">
        <Link to="/my-profile" className="flex items-center space-x-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white font-semibold text-[#2563EB]">
            {user?.firstname?.[0]}
            {user?.lastname?.[0]}
          </div>
          <div>
            <p className="font-semibold">
              {user?.firstname} {user?.lastname}
            </p>
            <p className="text-sm">{'Super Admin'}</p>
          </div>
        </Link>
      </div>
    </aside>
  )
}

export default SideBar
