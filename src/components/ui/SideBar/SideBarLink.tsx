import useLogout from '@/features/auth/hooks/useLogout'
import { cn } from '@/lib/utils'
import { useStore } from '@/store/store'
import { NavLink, useNavigate } from 'react-router-dom'

type Props = {
  to: string
  icon: React.ReactNode
  label: string
  disabled?: boolean
  isActive?: boolean
}
const SideBarLink = (props: Props) => {
  const setClickedLearnRequestName = useStore((state) => state.auth.setClickedLearnRequestName)
  const logout = useLogout()
  const handleLogout = () => {
    logout.mutate()
  }

  return (
    <>
      {props.disabled ? (
        <div
          aria-disabled={true}
          className="text-nav flex min-h-fit w-full cursor-not-allowed items-center gap-3 rounded-lg p-3 opacity-50"
        >
          {props.icon}
          <span
            className={cn(
              'overflow-hidden text-ellipsis text-nowrap',
              props.to === '/login' && 'text-[#A65959]'
            )}
          >
            {props.label}
          </span>
        </div>
      ) : (
        <div className="w-full -space-y-1">
          <NavLink
            to={props.to}
            onClick={() => {
              if (props.to === '/login') {
                handleLogout()
              } else {
                setClickedLearnRequestName('')
              }
            }}
            className={(navData) => {
              const active = props?.isActive ?? navData.isActive
              return active
                ? 'flex min-h-fit w-full items-center gap-3 rounded-lg bg-primary p-3 text-white'
                : 'text-nav flex min-h-fit w-full items-center gap-3 rounded-lg p-3'
            }}
          >
            {props.icon}
            <span
              className={cn(
                'overflow-hidden text-ellipsis text-nowrap',
                props.to === '/login' && 'text-[#A65959]'
              )}
            >
              {props.label}
            </span>
          </NavLink>
        </div>
      )}
    </>
  )
}

export default SideBarLink
