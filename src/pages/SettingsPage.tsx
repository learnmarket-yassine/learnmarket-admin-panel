import BackButton from '@/components/ui/BackButton'
import PlatformSettingsForm from '@/features/Settings/components/ui/PlatformSettingsForm'
import useGetPlatformSettings from '@/features/Settings/hooks/useGetSettings'

const SettingsPage = () => {
  const { data: platformSettings, isLoading } = useGetPlatformSettings()
  return (
    <div
      className="h-full space-y-7 p-4"
      style={{
        maxHeight: `calc(100% - 100px)`,
      }}
    >
      <div className="space-y-3">
        <BackButton text={'Back'} className="text-xl text-primary" route={`/learn-requests`} />
        <p>
          Here you can configure platform preferences, and keep your account and platform settings
          organized and up to date.
        </p>
      </div>
      <PlatformSettingsForm data={platformSettings} isLoading={isLoading} />
    </div>
  )
}

export default SettingsPage
