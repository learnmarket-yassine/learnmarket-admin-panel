import BackButton from '@/components/ui/BackButton'
import EditAccountForm from '@/features/Settings/components/ui/AccountSettingsForm'

const AccountSettingsPage = () => {
  return (
    <div
      className="h-full space-y-7 p-4"
      style={{
        maxHeight: `calc(100% - 100px)`,
      }}
    >
      <div className="space-y-3">
        <BackButton text={'Back'} className="text-xl text-primary" route={`/learn-requests`} />
        <p>Update your account information to keep it accurate and up to date.</p>
      </div>
      <EditAccountForm />
    </div>
  )
}

export default AccountSettingsPage
