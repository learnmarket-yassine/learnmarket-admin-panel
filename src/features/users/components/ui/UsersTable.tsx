import { TableCell, TableRow } from '@/components/ui/table'
import { useStore } from '@/store/store'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import Loader from '@/components/ui/Loader/Loader'
import useGetUsers from '../../hooks/useGetUsers'
import { formatDate } from 'date-fns'
import CustomTable from '@/components/ui/CustomTable'
import ViewIcon from '@/assets/ViewIcon'
import ConfirmModal from '@/components/layout/ConfirmModal'
import useBlockUser from '../../hooks/useBlockUser'
import useUnblockUser from '../../hooks/useUnblockUser'

const headers = [
  {
    optionName: 'see',
    headerTitle: 'Views',
    filterParams: {
      hideOrder: true,
      hideSearch: true,
    },
  },
  {
    optionName: 'username',
    headerTitle: 'Username',
    filterParams: {
      hideOrder: true,
    },
  },
  {
    optionName: 'role',
    headerTitle: 'Role',
    filterParams: {
      hideOrder: true,
    },
  },

  {
    optionName: 'country',
    headerTitle: 'Country',
    filterParams: {
      hideOrder: true,
    },
  },
  {
    optionName: 'createdAt',
    headerTitle: 'Creation Date',
    filterParams: {
      hideSearch: true,
    },
  },
  {
    optionName: 'status',
    headerTitle: 'Status',
    filterParams: {
      hideOrder: true,
      hideSearch: true,
    },
  },
]

const UsersTable = () => {
  const getUsersQuery = useGetUsers()
  const { mutateAsync: blockUserMutate, isPending: blockUserPending } = useBlockUser()
  const { mutateAsync: unblockUserMutate, isPending: unblockUserPending } = useUnblockUser()
  const users = useStore((state) => state.users.users)
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && getUsersQuery.hasNextPage) {
      getUsersQuery.fetchNextPage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, getUsersQuery.hasNextPage, getUsersQuery.fetchNextPage])

  const usersRows = users?.map((user) => (
    <TableRow key={user?.id}>
      <TableCell className="flex items-center justify-center font-medium">
        <ViewIcon />
      </TableCell>
      <TableCell className="text-center font-medium">
        {user?.firstname + ' ' + user?.lastname}
      </TableCell>
      <TableCell className="text-center font-medium">{user.role}</TableCell>
      <TableCell className="text-center font-medium">{user?.country}</TableCell>
      <TableCell className="w-36 text-center font-medium">
        {formatDate(user.createdAt ?? '', 'dd/MM/yyyy')}
      </TableCell>
      <TableCell className="text-center font-medium">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
            user.isBlocked ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
          }`}
        >
          {user.isBlocked ? 'Blocked' : 'Active'}
        </span>
      </TableCell>
      <TableCell className="align-center flex justify-center gap-4 text-end">
        <ConfirmModal
          name="User Modal"
          type={user.isBlocked ? 'active' : 'inactive'}
          title={
            user.isBlocked
              ? `Activate ${user?.firstname} ${user?.lastname}`
              : `Deactivate ${user?.firstname} ${user?.lastname}`
          }
          description={
            user.isBlocked
              ? `Activating this user will restore ${user?.firstname} ${user?.lastname}'s access to the platform.`
              : `Deactivating this user will suspend ${user?.firstname} ${user?.lastname}'s access to the platform.`
          }
          handleConfirm={async () =>
            user.isBlocked ? await unblockUserMutate(user.id) : await blockUserMutate(user.id)
          }
          isLoading={blockUserPending || unblockUserPending}
        />
      </TableCell>
    </TableRow>
  ))

  return (
    <>
      <CustomTable
        headers={headers}
        data={
          <>
            {getUsersQuery.isLoading ? (
              <TableRow>
                <TableCell colSpan={headers.length + 1} className="min-h-full">
                  <Loader className="flex h-full w-full items-center justify-center" />
                </TableCell>
              </TableRow>
            ) : (
              <>
                {usersRows}
                <TableRow ref={ref}>
                  <TableCell colSpan={headers.length + 1} className="h-full">
                    {getUsersQuery.isFetchingNextPage && (
                      <Loader className="flex w-full items-center justify-center" />
                    )}
                  </TableCell>
                </TableRow>
              </>
            )}
          </>
        }
        filterType="user"
        hasData={getUsersQuery.isLoading || getUsersQuery?.data?.pages[0]?.totalCount !== 0}
      />
    </>
  )
}

export default UsersTable
