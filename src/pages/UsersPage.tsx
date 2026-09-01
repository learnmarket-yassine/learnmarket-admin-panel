import BackButton from '@/components/ui/BackButton'
import UsersTable from '@/features/users/components/ui/UsersTable'

const UsersPage = () => {
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
          Here you can manage users on the platform, Monitor accounts, manage access, and ensure a
          secure and reliable experience for all users.
        </p>
      </div>
      <UsersTable />
    </div>
  )
}

export default UsersPage
