import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Loader from './components/ui/Loader/Loader'
import useRefreshToken from './features/auth/hooks/useRefreshToken'

const PersistLogin = () => {
  const getNewAccessToken = useRefreshToken()
  const [isLoading, setIsLoading] = useState(true) // State to track loading

  useEffect(() => {
    const refreshToken = async () => {
      try {
        await getNewAccessToken()
      } finally {
        setIsLoading(false)
      }
    }

    refreshToken()
  }, [getNewAccessToken])
  return (
    <>
      {isLoading ? (
        <Loader className="flex h-full w-full items-center justify-center" />
      ) : (
        <Outlet />
      )}
    </>
  )
}

export default PersistLogin
